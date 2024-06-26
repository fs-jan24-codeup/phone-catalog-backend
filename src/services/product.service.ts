import { Product, ProductDetails } from '@prisma/client';

import prisma from '../utils/db.ts';

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
  category: string = '',
  sortOrder: string,
  searchString: string = '',
): Promise<(Product & { details: ProductDetails[] })[]> => {
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
    include: {
      details: true,
    },
  });

  return result.length ? result : [];
};

export async function getOne(
  itemId: string,
): Promise<(Product & { details: ProductDetails[] }) | null> {
  return prisma.product.findUnique({
    where: { itemId },
    include: {
      details: true,
    },
  });
}

export async function getRecommended(
  itemId: string,
): Promise<(Product & { details: ProductDetails[] })[]> {
  const product = await getOne(itemId);
  if (!product) {
    return [];
  }
  return prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    include: {
      details: true,
    },
  });
}

export const getNew = async (): Promise<
  (Product & { details: ProductDetails[] })[]
> => {
  return prisma.product.findMany({
    orderBy: {
      year: 'desc',
    },
    take: 10,
    include: {
      details: true,
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
