import { Status } from '../types/constants';

import * as favouritesService from '../services/favourites.service';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await favouritesService.getAll();

    if (!products.length) {
      res.status(Status.NO_CONTENT).json({ error: 'Nothing added yet' });
    }

    res.statusCode = Status.OK;
    res.send(products);
  } catch (e) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching phones' });
  }
};
