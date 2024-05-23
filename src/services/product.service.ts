import { Product } from '@prisma/client';

import prisma from '../db.ts';

export const getAll = async (
  limit: number,
  sortBy: string,
): Promise<Product[]> => {
  const result = await prisma.product.findMany({
    take: limit,
    orderBy: {
      [sortBy]: 'asc',
    },
  });
  return result;
};

export const normalize = (product: Partial<Product>): Partial<Product> => {
  const { id, name, category } = product;
  return { id, name, category };
};


export async function getOne(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id: id.toString() },
  });
}