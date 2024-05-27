// import { UserCart } from '@prisma/client';
import prisma from '../utils/db';

const getOrders = async () => {
  const orders = await prisma.userCart.findMany({
    include: { products: true },
  });

  return orders;
};

const createOrder = async (userId: number, products) => {
  const order = await prisma.userCart.create({
    data: {
      userId,
      products: {
        create: products.map(product => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      },
    },
    include: { products: true },
  });

  return order;
};

const deleteOrder = async (orderId: number): Promise<void> => {
  await prisma.userCart.delete({
    where: {
      id: orderId,
    },
  });
};

export { getOrders, createOrder, deleteOrder };
