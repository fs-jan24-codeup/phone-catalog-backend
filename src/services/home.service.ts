import { Product } from '@prisma/client';

import prisma from '../db';

async function getAll(): Promise<Product[]> {
  const result = await prisma.product.findMany();

  return result;
}

export { getAll };