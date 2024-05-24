import { Status } from '../types/constants';
import * as accessoriesService from '../services/accessories.service';
import { Request, Response } from 'express';

export const getAllAccessories = async (req: Request, res: Response) => {
  try {
    const products = await accessoriesService.getAll();
    const accessories = products.filter(
      product => product.category === 'accessories',
    );

    if (!accessories.length) {
      res.status(Status.NOT_FOUND).json({ error: 'Accessories not found!!!' });
    }

    res.statusCode = Status.OK;
    res.send(accessories);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching accessories' });
  }
};
