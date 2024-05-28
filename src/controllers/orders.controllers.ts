import { Request, Response } from 'express';
import * as orderService from '../services/orders.service';
import { Status } from '../types/constants';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    res.statusCode = Status.OK;
    res.send(orders);
  } catch {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching orders' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { userId, products } = req.body;

  try {
    const orders = await orderService.createOrder(userId, products);

    res.statusCode = Status.CREATED;
    res.send(orders);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching orders' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await orderService.deleteOrder(Number(id));

    res.statusCode = Status.NO_CONTENT;
    res.end();
  } catch {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while deleting order' });
  }
};
