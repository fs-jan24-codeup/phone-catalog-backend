import { Product } from '@prisma/client';

import prisma from '../db.ts';

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
  category: string = '',
  sortOrder: string,
  searchString: string = '',
): Promise<Product[]> => {
  const offset = (page - 1) * limit;

  const where: {
    category?: string;
    name?: { contains: string; mode: 'insensitive' };
  } = {};

  if (category) {
    where.category = category;
  }

  if (searchString) {
    where.name = {
      contains: searchString,
      mode: 'insensitive',
    };
  }

  const result = await prisma.product.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where,
  });

  return result.length ? result : [];
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

export const getAccessories = async () => {
  return prisma.product.findMany({
    where: {
      category: 'accessories',
    },
  });
};
