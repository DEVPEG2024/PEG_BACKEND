import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getCustomers } from '../../controllers/customers/find.controller';
import { createCategoryCustomer, updateCategoryCustomerById, getCategoriesCustomer, deleteCategoryCustomerById } from '../../controllers/customers/cat_customer.controller';
import { createCustomer } from '../../controllers/customers/create.controller';
import { updateCustomer, updateCustomerStatus } from '../../controllers/customers/update.controller';
import { deleteCustomer } from '../../controllers/customers/delete.controller';
import { getDashboardHomeCustomer } from '../../controllers/customers/home_customer.controller';
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
