import express from 'express';
import * as orderController from '../controllers/orders.controllers';

const router = express.Router();

router.get('/', orderController.getOrders);

router.post('/', orderController.createOrder);

router.delete('/:id', orderController.deleteOrder);

export const ordersRouterApp = router;
