import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getCustomers } from '../../controllers/custumers/find.controller';
import { createCategoryCustomer, updateCategoryCustomerById, getCategoriesCustomer, deleteCategoryCustomerById } from '../../controllers/custumers/cat_customer.controller';
import { createCustomer } from '../../controllers/custumers/create.controller';
import { updateCustomer, updateCustomerStatus } from '../../controllers/custumers/update.controller';
import { deleteCustomer } from '../../controllers/custumers/delete.controller';
import { getDashboardHomeCustomer } from '../../controllers/custumers/home_customer.controller';
// Customer
router.get('/admin/', authMiddleware, getCustomers);
router.post('/admin/create', authMiddleware, createCustomer);
router.put('/admin/update', authMiddleware, updateCustomer);
router.put('/admin/update-status', authMiddleware, updateCustomerStatus);
router.delete('/admin/delete', authMiddleware, deleteCustomer);


// Category Customer
router.post('/admin/category/create', authMiddleware, createCategoryCustomer);
router.put('/admin/category/update/:id', authMiddleware, updateCategoryCustomerById);
router.get('/admin/category', authMiddleware, getCategoriesCustomer);
router.delete('/admin/category/delete/:id', authMiddleware, deleteCategoryCustomerById);


// Customer
router.get('/home/:id', authMiddleware, getDashboardHomeCustomer);
export default router;
