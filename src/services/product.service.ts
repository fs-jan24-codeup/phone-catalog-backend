import { Product } from '@prisma/client';

import prisma from '../db.ts';

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
): Promise<Product[]> => {
  const skip = (page - 1) * limit;

  const result = await prisma.product.findMany({
    take: limit,
    skip,
    orderBy: {
      [sortBy]: 'asc',
    },
  });

  return result;
};

export async function getOne(itemId: string): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { itemId },
  });
}

export async function getRecommended(itemId: string): Promise<Product[]> {
  const product = await getOne(itemId);
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

export const getNew = async () => {
  return prisma.product.findMany({
    orderBy: {
      year: 'desc',
    },
    take: 10,
  });
};

export const getPhones = async () => {
  return prisma.product.findMany({
    where: {
      category: 'phones',
    },
  });
};

export const getDiscount = async () => {
  return prisma.product.findMany({
    orderBy: {
      price: 'asc',
    },
  });
};
