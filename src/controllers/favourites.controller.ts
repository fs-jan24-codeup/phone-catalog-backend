import { Status } from '../types/constants';

import * as favouritesService from '../services/favourites.service';
import { Request, Response } from 'express';
import { normalizeProductDetails } from '../utils/normalize';

export const addFavourite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { productId } = req.body;

    await favouritesService.addFavourite(userId, productId);

    res.status(Status.OK).send({ message: 'Product added to favourites' });
  } catch (e) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while adding favourite' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ error: 'User ID is required' });
    }

    const products = await favouritesService.getAllForUser(+userId);

    res
      .status(Status.OK)
      .send(products.map(prod => normalizeProductDetails(prod)));
  } catch (e) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching favourites' });
  }
};

export const removeFavourite = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { productId } = req.body;

    await favouritesService.removeFavourite(userId, productId);

    res.status(Status.OK).send({ message: 'Product removed from favourites' });
  } catch (e) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while removing favourite' });
  }
};
