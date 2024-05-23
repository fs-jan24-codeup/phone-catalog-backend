// import { Status } from '../types/constants';
// import * as homeService from '../services/home.service';
// import { Request, Response } from 'express';
// import { Product } from '../types/types';

// export const getAll = async (req: Request, res: Response) => {
//   const products = await homeService.getAll();

//   const phones = products.filter(phone => phone.category === 'phones');

//   if (!phones.length) {
//     res.status(Status.NOT_FOUND).json({ error: 'Phones not found' });
//   }

//   res.statusCode = Status.OK;
//   res.send(phones);
// };
