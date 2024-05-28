import express from 'express';
import { authController } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/registration', authController.register);
router.post('/login', authController.login);
router.get('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export const authRouterApp = router;
