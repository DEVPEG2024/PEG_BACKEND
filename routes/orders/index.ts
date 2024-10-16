import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getOrders, getOngoingOrdersByCustomer, getOrderById } from '../../controllers/orders/find.controller';
import { createOrder } from '../../controllers/orders/create.controller';
import { updateOrderStatus } from '../../controllers/orders/update.controller';

//TODO: voir pour ne pas laisser accès à tout le monde à ces APIs -> comment faire pour empêcher appel intempestif ?
// Orders routes
router.get('/', authMiddleware, getOrders);
router.post('/create', authMiddleware, createOrder);
router.put('/update-status/:id', authMiddleware, updateOrderStatus);
//router.delete('/admin/delete/:id', authMiddleware, deleteOrder);

// Orders by customer
router.get('/customer', authMiddleware, getOngoingOrdersByCustomer);

// Autres
router.get('/:id', authMiddleware, getOrderById);

export default router;
