import jwt from 'jsonwebtoken';

interface NormalizedUser {
  id: number;
  email: string;
}

function sign(user: NormalizedUser) {
  const secretKey = process.env.JWT_KEY;

  console.log(process.env);

  if (!secretKey) {
    throw new Error('JWT_KEY is not defined in environment variables');
  }

  const token = jwt.sign(user, secretKey, { expiresIn: '5000s' });

  return token;
}

function verify(token: string) {
  try {
    const secretKey = process.env.JWT_KEY;

    if (!secretKey) {
      throw new Error('JWT_KEY is not defined in environment variables');
    }

    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

function signRefresh(user: NormalizedUser) {
  const secretKey = process.env.JWT_REFRESH_KEY;

  if (!secretKey) {
    throw new Error('JWT_KEY is not defined in environment variables');
  }

  const token = jwt.sign(user, secretKey);

  return token;
}

function verifyRefresh(token: string) {
  try {
    const secretKey = process.env.JWT_REFRESH_KEY;

    if (!secretKey) {
      throw new Error('JWT_KEY is not defined in environment variables');
    }

    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

export const jwtService = {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};
