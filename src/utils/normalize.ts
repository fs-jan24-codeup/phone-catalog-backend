import { Product, ProductDetails } from '@prisma/client';

export const normalizeProductDetails = (
  product: Product & { details: ProductDetails[] },
) => {
  const { details, id, ...data } = product;

  return { productId: id, ...data, ...details[0] };
};
