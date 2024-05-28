import { Product, ProductDetails } from '@prisma/client';

export const normalizeProductDetails = (
  product: Product & { details: ProductDetails[] },
) => {
  const { details, ...data } = product;

  return { ...data, ...details[0] };
};
