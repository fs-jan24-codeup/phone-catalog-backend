import express from 'express';
import {
  getAll,
  getOne,
  getRecommended,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/recommended/:id', getRecommended);

export const productRouterApp = router;
