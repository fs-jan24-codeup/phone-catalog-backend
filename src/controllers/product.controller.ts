import { Status } from '../types/constants';
// import { Product } from '@prisma/client';
import * as productService from '../services/product.service';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const products = await productService.getAll();

  res.send(products);
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getOne(+id);

  if (!product) {
    return res.sendStatus(Status.NOT_FOUND);
  }

  res.send(product);
};
