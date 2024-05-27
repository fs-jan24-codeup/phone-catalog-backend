import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service';
import prisma from '../db.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { jwtService } from '../services/jwt.service.ts';
import bcrypt from 'bcrypt';
import { tokenService } from '../services/token.service.ts';

const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {
    const activationToken = uuidv4();
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
        activationToken,
      },
    });

    await emailService.sendActivationEmail(email, activationToken);

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Could not register user' });
  }
};

interface NormalizedUser {
  id: number;
  email: string;
}

function normalize(user: { id: number; email: string }): NormalizedUser {
  const { id, email } = user;
  return { id, email };
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({ error: 'Incorrect email or password' });
  }

  generateToken(res, user);
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const user = jwtService.verifyRefresh(refreshToken);
  const token = await tokenService.getByToken(refreshToken);

  if (!user || !token) {
    throw new Error('Unauthorized');
    return;
  }

  generateToken(res, user);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateToken = async (res: Response, user: any) => {
  const normalisedUser = normalize(user);

  const accessToken = jwtService.sign(normalisedUser);
  const refreshAccessToken = jwtService.signRefresh(normalisedUser);

  await tokenService.save(normalisedUser.id, refreshAccessToken);

  res.cookie('refreshToken', refreshAccessToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.send({
    user: normalisedUser,
    token: accessToken,
  });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const user = await jwtService.verifyRefresh(refreshToken);

  if (!user || !refreshToken) {
    throw new Error('Unauthorized');
    return;
  }

  if (typeof user === 'object' && user !== null && 'id' in user) {
    const userId = user.id;
    await tokenService.remove(userId);
  }

  res.sendStatus(204);
};

export const authController = {
  register,
  login,
  refresh,
  logout,
};
