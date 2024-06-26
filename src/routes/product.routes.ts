import express from 'express';
import {
  getAll,
  getOne,
  getRecommended,
  getNew,
  getPhones,
  getTablets,
  getAccsessories,
  getDiscount,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAll);

router.get('/discount', getDiscount);

router.get('/phones', getPhones);

router.get('/tablets', getTablets);

router.get('/accessories', getAccsessories);

router.get('/recommended/:id', getRecommended);

router.get('/new', getNew);

router.get('/:id', getOne);

export const productRouterApp = router;
