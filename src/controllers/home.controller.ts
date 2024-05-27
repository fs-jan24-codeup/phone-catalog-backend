import { Status } from '../types/constants';
import * as homeService from '../services/home.service';
import { Request, Response } from 'express';

export const getAllCategoriesWithCounts = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await homeService.getCountByCategory();

    if (!categories.length) {
      res.status(Status.NOT_FOUND).send({ message: 'No products found' });
      return;
    }

    res.status(Status.OK).send(categories);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching categories' });
  }
};
