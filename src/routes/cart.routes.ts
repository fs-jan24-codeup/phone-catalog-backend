import express from 'express';
import * as cartController from '../controllers/cart.controllers';

const router = express.Router();

router.get('/', cartController.getOrders);

router.post('/', cartController.createOrder);

router.delete('/:id', cartController.deleteOrder);

export const ordersRouterApp = router;
