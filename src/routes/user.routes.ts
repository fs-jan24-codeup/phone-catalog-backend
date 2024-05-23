import express from 'express';
import { getAll, getOne } from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

export const userRouterApp = router;
