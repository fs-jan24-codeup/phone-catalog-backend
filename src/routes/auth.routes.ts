import express from 'express';
import { authController } from '../controllers/auth.controllers';

const router = express.Router();

router.post('/registration', authController.register);
// router.get('/activation/:activationToken', authController.activate);
router.post('/login', authController.login);

export const authRouterApp = router;
