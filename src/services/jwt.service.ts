import jwt from 'jsonwebtoken';

interface NormalizedUser {
  id: number;
  email: string;
}

function sign(user: NormalizedUser) {
  const secretKey = process.env.JWT_KEY;

  if (!secretKey) {
    throw new Error('JWT_KEY is not defined in environment variables');
  }

  const token = jwt.sign(user, secretKey);

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

export const jwtService = {
  sign,
  verify,
};
