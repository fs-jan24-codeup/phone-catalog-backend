import express from 'express';
import * as orderController from '../controllers/orders.controllers';
import { authMiddleware } from '../middlewares/auth.middlewares';

const router = express.Router();

router.get('/', authMiddleware, orderController.getOrders);

router.post('/', orderController.createOrder);

router.delete('/:id', orderController.deleteOrder);

export const ordersRouterApp = router;
