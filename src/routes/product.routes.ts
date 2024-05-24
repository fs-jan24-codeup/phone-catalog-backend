import express from 'express';
import {
  getAll,
  getOne,
  getRecommended,
  getNew,
  getPhones,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAll);

router.get('/phones', getPhones);

router.get('/recommended/:id', getRecommended);

router.get('/new', getNew);

router.get('/:id', getOne);

export const productRouterApp = router;
