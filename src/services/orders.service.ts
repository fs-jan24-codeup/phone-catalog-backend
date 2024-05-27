import { Order, OrderProduct } from '@prisma/client';
import prisma from '../utils/db';

const getOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    include: { products: true },
  });

  return orders;
};

const createOrder = async (
  userId: number,
  products: OrderProduct[],
): Promise<Order> => {
  const order = await prisma.order.create({
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
  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
};

export { getOrders, createOrder, deleteOrder };
