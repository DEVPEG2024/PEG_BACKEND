import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getOrders, getOngoingOrdersByCustomer, getOrderById } from '../../controllers/orders/find.controller';
import { createOrder } from '../../controllers/orders/create.controller';
import { deleteOrder } from '../../controllers/orders/delete.controller';

//TODO: voir pour ne pas laisser accès à tout le monde à ces APIs -> comment faire pour empêcher appel intempestif ?
// Orders routes
router.get('/', authMiddleware, getOrders);
router.post('/create', authMiddleware, createOrder);
//router.put('/admin/update', authMiddleware, updateProduct);
router.delete('/admin/delete/:id', authMiddleware, deleteOrder);

// Products by customer
router.get('/customer', authMiddleware, getOngoingOrdersByCustomer);

// Autres
router.get('/:id', authMiddleware, getOrderById);

export default router;
