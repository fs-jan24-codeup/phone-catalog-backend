import { User } from '@prisma/client';

// const prisma = new PrismaClient();
import prisma from '../db.ts';

export const getAll = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

export async function getOne(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
