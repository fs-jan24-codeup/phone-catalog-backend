import { User } from '@prisma/client';

import prisma from '../utils/db.ts';

export const getAll = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

export async function getOne(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}
