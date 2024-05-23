import express from 'express';
import {
  getAll,
  getOne,
  //  create,
  getRecommended,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/', getAll);

router.get('/:id', getOne);

router.get('/recommended/:id', getRecommended);

// router.post('/', create);
// router.patch('/:id', update);

// router.delete('/:id', remove);

export const productRouterApp = router;
