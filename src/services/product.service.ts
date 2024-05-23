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

export async function getOne(id: number): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id: id.toString() },
  });
}

export async function getRecommended(id: number): Promise<Product[]> {
  const product = await getOne(id);
  if (!product) {
    return [];
  }
  return prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
  });
}
