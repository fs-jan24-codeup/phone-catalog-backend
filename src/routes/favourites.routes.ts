import express from 'express';
import * as favouritesController from '../controllers/favourites.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';

const router = express.Router();

router.get('/:userId', authMiddleware, favouritesController.getAll);
router.post('/add', authMiddleware, favouritesController.addFavourite);
router.post('/remove', authMiddleware, favouritesController.removeFavourite);

export const favouritesRouterApp = router;
