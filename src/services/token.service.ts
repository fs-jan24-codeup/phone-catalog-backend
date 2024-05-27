import prisma from '../utils/db.ts';

async function save(userId: number, newToken: string) {
  const existingToken = await prisma.refreshToken.findUnique({
    where: { id: userId },
  });

  if (!existingToken) {
    await prisma.refreshToken.create({
      data: {
        token: newToken,
        userId: userId,
      },
    });
  } else {
    await prisma.refreshToken.update({
      where: { id: userId },
      data: { token: newToken },
    });
  }
}

async function getByToken(refreshToken: string) {
  const token = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });
  return token;
}

async function remove(userId: number) {
  const refreshToken = await prisma.refreshToken.findFirst({
    where: { userId: userId },
  });
  if (!refreshToken) {
    throw new Error('Refresh token not found for the user');
  }
  return prisma.refreshToken.delete({
    where: { id: refreshToken.id },
  });
}

export const tokenService = {
  save,
  getByToken,
  remove,
};
