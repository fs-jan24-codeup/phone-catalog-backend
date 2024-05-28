import prisma from '../utils/db';

const createItemtoCart = async (userId: number, productId: number) => {
  const newItem = await prisma.cart.create({
    data: {
      userId,
      productId,
    },
  });

  return newItem;
};

const getCart = async (userId: number) => {
  const cart = await prisma.cart.findMany({
    where: { userId: userId },
    include: {
      product: true,
    },
  });

  return cart;
};

export { createItemtoCart, getCart };
