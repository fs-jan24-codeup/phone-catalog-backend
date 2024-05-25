import { Product, ProductDetails } from '@prisma/client';

export const normalizeProductDetails = (
  product: Product & { details: ProductDetails[] },
) => {
  const { details, ...data } = product;

  console.log({ ...data, ...details[0] });

  return { ...data, ...details[0] };
};
