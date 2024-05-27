import express from 'express';
import * as favouritesController from '../controllers/favourites.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const router = express.Router();

router.get('/', authMiddleware, favouritesController.getAll);

export const favouritesRouterApp = router;
