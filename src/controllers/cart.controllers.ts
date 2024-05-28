import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';
import { Status } from '../types/constants';

export const addItemToCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;
  try {
    const cartItem = await cartService.createItemtoCart(userId, productId);

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
