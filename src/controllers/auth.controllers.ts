import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from '../services/email.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { jwtService } from '../services/jwt.service.ts';
import prisma from '../utils/db.ts';

const register = async (req: Request, res: Response) => {
  const { email, password, name = '' } = req.body;

  console.log({ email, password, name, body: req.body });

  try {
    const activationToken = uuidv4();
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
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
    console.log(error);

    res.status(500).json({ error: 'Could not register user' });
  }
};

// const activate = async (req: Request, res: Response) => {
//   const { activationToken } = req.params;

//   const user = await prisma.user.findUnique({
//     where: {
//       activationToken,
//     },
//   });

//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       activationToken: '',
//     },
//   });

//   res.status(200).json({ message: 'User activated successfully', user });
// };

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

  if (!user || user.password !== password) {
    return res.status(404).json({ error: 'Incorrect email or password' });
  }

  const normalisedUser = normalize(user);
  const accessToken = jwtService.sign(normalisedUser);

  res.send({
    user: normalisedUser,
    token: accessToken,
  });
};

export const authController = {
  register,
  //   activate,
  login,
};
