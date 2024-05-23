import { Status } from '../types/constants';
import * as productService from '../services/product.service';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { perPage, sortBy } = req.query;

  const limit = parseInt(perPage as string, 10) || 10;
  const sort = (sortBy as string) || 'name';

  try {
    const products = await productService.getAll(limit, sort);
    res.send(products.map(prod => productService.normalize(prod)));
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getOne(+id);

  if (!product) {
    return res.sendStatus(Status.NOT_FOUND);
  }

  res.send(product);
};

export const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await productService.getRecommended(+id);
  res.send(products);
};
