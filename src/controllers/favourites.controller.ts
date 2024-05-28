import { Status } from '../types/constants';

import * as favouritesService from '../services/favourites.service';
import { Request, Response } from 'express';

// export const getAll = async (req: Request, res: Response) => {
//   try {
//     const products = await favouritesService.getAll();

//     if (!products.length) {
//       res.status(Status.NO_CONTENT).json({ error: 'Nothing added yet' });
//     }

//     res.statusCode = Status.OK;
//     res.send(products);
//   } catch (e) {
//     res
//       .status(Status.INTERNAL_SERVER_ERROR)
//       .send({ error: 'An error occurred while fetching phones' });
//   }
// };

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

    if (!products.length) {
      return res.status(Status.NO_CONTENT).json({ error: 'Nothing added yet' });
    }

    res.status(Status.OK).send(products);
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
