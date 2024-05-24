import { Product } from '@prisma/client';
import prisma from '../db.ts';

async function getAllImages(): Promise<Product[]> {
  const result = await prisma.image.findMany();

  return result;
}

export { getAllImages };
