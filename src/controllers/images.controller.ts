import { Status } from '../types/constants';
import * as imagesService from '../services/images.service';
import { Request, Response } from 'express';

export const getAllPhones = async (req: Request, res: Response) => {
  try {
    const images = await imagesService.getAllImages();

    res.statusCode = Status.OK;
    res.send(images);
  } catch (error) {
    res
      .status(Status.INTERNAL_SERVER_ERROR)
      .send({ error: 'An error occurred while fetching images' });
  }
};
