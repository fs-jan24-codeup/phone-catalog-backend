import express from 'express';
import * as favouritesController from '../controllers/favourites.controller';

const router = express.Router();

router.get('/', favouritesController.getAll);

export const favouritesRouterApp = router;
