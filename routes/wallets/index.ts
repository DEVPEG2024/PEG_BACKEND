import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { payProducer } from '../../controllers/wallet/create.controller';

// Products routes Admin
router.post('/admin/pay-producer', authMiddleware, payProducer);


export default router;
