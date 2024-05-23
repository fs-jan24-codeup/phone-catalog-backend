import { PrismaProduct } from '../models/Product.model';
import { Product } from '../types/types.js';

const normalize = ({ id, name }: Product): Product => {
  return { id, name };
};

async function getAll(): Promise<Product[]> {
  const result = await PrismaProduct.findMany();

  return result;
}

async function getOne(id: number): Promise<Product | null> {
  return PrismaProduct.findByPk(id);
}

async function createOne({ id, name }: Product): Promise<Product> {
  return PrismaProduct.create({ id, name });
}

async function updateOne(
  id: number,
  { name }: Partial<Product>,
): Promise<Product | null> {
  await PrismaProduct.update({ name }, { where: { id } });

  return getOne(id);
}

async function deleteOne(id: number): Promise<boolean> {
  await PrismaProduct.destroy({ where: { id } });

  return true;
}

export {
  normalize,
  PrismaProduct,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
