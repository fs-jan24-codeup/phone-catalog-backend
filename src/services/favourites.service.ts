import { Product } from '@prisma/client';

import prisma from '../utils/db.ts';

// export const getAll = async (): Promise<Product[]> => {
//   const result = await prisma.product.findMany();

//   return result;
// };

export const addFavourite = async (
  userId: number,
  productId: string,
): Promise<void> => {
  await prisma.user.update({
    where: { id: +userId },
    data: { favourites: { push: productId } },
  });
};

export const getAllForUser = async (userId: number): Promise<Product[]> => {
  const user = await prisma.user.findUnique({
    where: { id: +userId },
    select: { favourites: true },
  });

  if (!user || !user.favourites.length) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: user.favourites.map(id => Number(id)) },
    },
  });

  return products;
};

export const removeFavourite = async (
  userId: number,
  productId: string,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { id: +userId },
    select: { favourites: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedFavourites = user.favourites.filter(id => id !== productId);

  await prisma.user.update({
    where: { id: +userId },
    data: { favourites: updatedFavourites },
  });
};
