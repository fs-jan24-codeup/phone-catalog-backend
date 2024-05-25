import { Status } from '../types/constants';
import * as productService from '../services/product.service';
import { Request, Response } from 'express';
import { normalizeProductDetails } from '../utils/normalize';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    category = '',
    sortOrder = 'asc',
    searchString = '',
  } = req.query;

  const limit = parseInt(perPage as string, 10);
  const pageNumber = parseInt(page as string, 10);
  const sortField = sortBy as string;
  const order = sortOrder === 'desc' ? 'desc' : 'asc';
  const cat = category as string;
  const search = searchString as string;

  try {
    const products = await productService.getAll(
      +pageNumber,
      +limit,
      sortField,
      cat,
      order,
      search,
    );
    res.send(products.map(prod => normalizeProductDetails(prod)));
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch products' });
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productService.getOne(id);
  if (!product) {
    return res.sendStatus(Status.NOT_FOUND);
  }
  res.send(normalizeProductDetails(product));
};

export const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await productService.getRecommended(id);
  res.send(products.map(prod => normalizeProductDetails(prod)));
};

export const getNew = async (_: Request, res: Response) => {
  try {
    const products = await productService.getNew();
    res.send(products.map(prod => normalizeProductDetails(prod)));
  } catch (err) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch new products' });
  }
};

export const getPhones = async (req: Request, res: Response) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;

  try {
    const products = await productService.getAll(
      +page,
      +perPage,
      sortBy as string,
      'phones',
      sortOrder as string,
    );
    res
      .status(Status.CREATED)
      .send(products.map(prod => normalizeProductDetails(prod)));
  } catch (err) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch phones' });
  }
};

export const getTablets = async (req: Request, res: Response) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;

  try {
    const products = await productService.getAll(
      +page,
      +perPage,
      sortBy as string,
      'tablets',
      sortOrder as string,
    );
    res
      .status(Status.CREATED)
      .send(products.map(prod => normalizeProductDetails(prod)));
  } catch (err) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch tablets' });
  }
};

export const getAccsessories = async (req: Request, res: Response) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;

  try {
    const products = await productService.getAll(
      +page,
      +perPage,
      sortBy as string,
      'accessories',
      sortOrder as string,
    );
    res
      .status(Status.CREATED)
      .send(products.map(prod => normalizeProductDetails(prod)));
  } catch (err) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch accessories' });
  }
};

export const getDiscount = async (_: Request, res: Response) => {
  try {
    const discountProducts = await productService.getDiscount();
    res.status(Status.OK).send(discountProducts);
  } catch {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to fetch discount products' });
  }
};
