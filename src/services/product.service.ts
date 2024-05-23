import { Product } from '@prisma/client';

import prisma from '../db.ts';

export const getAll = async (): Promise<Product[]> => {
  const result = await prisma.product.findMany();
  return result;
};

export async function getOne(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
  });
}
