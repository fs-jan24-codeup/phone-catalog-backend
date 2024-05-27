import { Status } from '../types/constants';
import * as homeService from '../services/home.service';
import { Request, Response } from 'express';

export const getAllPhones = async (req: Request, res: Response) => {
  try {
    const products = await homeService.getAll();
    const phones = products.filter(phone => phone.category === 'phones');

    if (!phones.length) {
      res.status(Status.NOT_FOUND);
    }

    res.statusCode = Status.OK;
    res.send(phones);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching phones' });
  }
};
