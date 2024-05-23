// import { Status } from '../types/constants';
// import * as productService from '../services/product.service';
// import { Request, Response } from 'express';
// import { Product } from '../types/types';

// export const getAll = async (req: Request, res: Response) => {
//   const products = await productService.getAll();
//   res.send(products.map((prod: Product) => productService.normalize(prod)));
// };

// export const getOne = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const product = await productService.getOne(id);

//   if (!product) {
//     return res.sendStatus(404);
//   }

//   res.send(productService.normalize(product));
// };

// export const create = async (req: Request, res: Response) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.sendStatus(400);
//   }

//   const product = await productService.createOne({ name });
//   res.status(Status.CREATED).send(productService.normalize(product));
// };

// export const update = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const product = await productService.updateOne(id, { name });
//   res.status(Status.OK).send(productService.normalize(product));
// };

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
