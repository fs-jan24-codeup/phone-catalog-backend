import { Status } from '../types/constants';
// import { Product } from '@prisma/client';
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

  res.send(productService.normalize(product));
};

export const getRecommended = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await productService.getRecommended(+id);
  res.send(products);
};

//export const create = async (req: Request, res: Response) => {
//  const { itemId, name, category, fullPrice, price, image } = req.body;
//  try {
//    const newProduct = await productService.createOne({
//      itemId,
//      name,
//      category,
//      fullPrice,
//      price,
//      image,
//    });
//    res.status(Status.CREATED).send(newProduct);
//  } catch (error) {
//    console.error('Error creating product:', error);
//    res
//      .status(Status.INTERNAL_SERVER_ERROR)
//      .json({ message: 'Error creating product' });
// }
//};

// export const remove = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const product = await productService.getOne(id);

//   if (!product) {
//     return res.sendStatus(Status.NOT_FOUND);
//   }

//   const deleted = await productService.deleteOne(id);

//   if (!deleted) {
//     return res.sendStatus(Status.NOT_FOUND);
//   }

//   res.sendStatus(Status.NO_CONTENT);
// };
