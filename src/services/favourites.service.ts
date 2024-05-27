import { Product } from '@prisma/client';

import prisma from '../utils/db.ts';

export const getAll = async (): Promise<Product[]> => {
  const result = await prisma.product.findMany();

  return result;
};
