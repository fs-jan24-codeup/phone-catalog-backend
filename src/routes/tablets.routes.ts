import express from 'express';
import * as tabletsController from '../controllers/tablets.controller';

const router = express.Router();

router.get('/', tabletsController.getAllTablets);

export const tabletsRouterApp = router;
