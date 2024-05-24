import express from 'express';
import * as accessoriesController from '../controllers/accessories.controller';

const router = express.Router();

router.get('/', accessoriesController.getAllAccessories);

export const accessoriesRouterApp = router;
