import express from 'express';
import * as cartController from '../controllers/cart.controllers';

const router = express.Router();

router.post('/', cartController.addItemToCart);

router.get('/:userId', cartController.getCart);

router.delete('/:userId/:productId', cartController.deleteItemFromCart);

export const cartRouterApp = router;
