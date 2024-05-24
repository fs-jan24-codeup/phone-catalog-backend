import { Status } from '../types/constants';
import * as productService from '../services/product.service';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { page = 1, perPage = 10, sortBy = 'name' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limit = parseInt(perPage as string, 10);
  const sort = sortBy as string;

  try {
    const products = await productService.getAll(pageNumber, limit, sort);
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch products' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getOne(id);
  if (!product) {
    return res.sendStatus(Status.NOT_FOUND);
  }
  res.send(product);
};

export const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await productService.getRecommended(id);
  res.send(products);
};

export const getNew = async (_: Request, res: Response) => {
  try {
    const products = await productService.getNew();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch new products' });
  }
};

export const getPhones = async (_: Request, res: Response) => {
  try {
    const products = await productService.getPhones();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch phones' });
  }
};
