import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import { Status } from '../types/constants';

export const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await cartService.createItemtoCart(
      userId,
      productId,
      quantity,
    );

    res.statusCode = Status.CREATED;
    res.send(cartItem);
  } catch (error) {
    res.statusCode = Status.INTERNAL_SERVER_ERROR;
    res.send({ error: 'An error occurred while adding item to cart' });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cartItems = await cartService.getCart(Number(userId));

    res.statusCode = Status.OK;
    res.send(cartItems);
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR);
    res.send({ error: 'An error occurred while fetching cart' });
  }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;
  try {
    const cart = await cartService.deleteItemFromCart(
      Number(userId),
      Number(productId),
    );

    if (cart) {
      res.statusCode = Status.NOT_FOUND;
      res.send({ message: 'Poduct item not found in cart' });
    }

    res.sendStatus(Status.NO_CONTENT);
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR);
    res.send({ error: 'An error occurred while deleting item from cart' });
  }
};
