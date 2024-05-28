import prisma from '../utils/db';

const createItemtoCart = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  let cart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  const cartItem = await prisma.cartProducts.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: productId,
      },
    },
    update: {
      quantity: quantity,
    },
    create: {
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
    },
  });

  return cartItem;
};

const getCart = async (userId: number) => {
  const cart = await prisma.cart.findFirst({
    where: { userId: userId },
    include: {
      CartProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return cart;
};

const deleteItemFromCart = async (userId: number, productId: number) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
  });

  const cartItem = await prisma.cartProducts.deleteMany({
    where: {
      cartId: cart?.id,
      productId: productId,
    },
  });

  if (cartItem.count === 0) {
    return 'not found';
  }
};

// await prisma.cartProducts.delete({
//   where: {
//     cartId_productId: {
//       cartId: cartId,
//       productId: productId,
//     },
//   },
// });

export { createItemtoCart, getCart, deleteItemFromCart };
