import { Status } from '../types/constants';
import * as tabletsService from '../services/tablets.service';
import { Request, Response } from 'express';

export const getAllTablets = async (req: Request, res: Response) => {
  try {
    const products = await tabletsService.getAll();
    const tablets = products.filter(product => product.category === 'tablets');

    if (!tablets.length) {
      res.status(Status.NOT_FOUND).json({ error: 'Tablets not found!!!' });
    }

    res.statusCode = Status.OK;
    res.send(tablets);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching tablets' });
  }
};
