import { Product, ProductDetails } from '@prisma/client';

import prisma from '../db.ts';

export const normalizeProductDetails = (
  product: Product & { details: ProductDetails[] },
) => {
  const { details, ...data } = product;

  return { ...data, ...details[0] };
};

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
  category = '',
): Promise<(Product & { details: ProductDetails[] })[]> => {
  const skip = (page - 1) * limit;

  const query = {
    where: {},
    take: limit,
    skip,
    orderBy: {
      [sortBy]: 'asc',
    },
    include: {
      details: true,
    },
  };

  if (category) {
    query.where = { category };
  }
  const result = await prisma.product.findMany(query);

  return result;
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

export const getPhones = async (): Promise<
  (Product & { details: ProductDetails[] })[]
> => {
  return prisma.product.findMany({
    where: {
      category: 'phones',
    },
    include: {
      details: true,
    },
  });
};

export const getAccessories = async (): Promise<
  (Product & { details: ProductDetails[] })[]
> => {
  return prisma.product.findMany({
    where: {
      category: 'accessories',
    },
    include: {
      details: true,
    },
  });
};
