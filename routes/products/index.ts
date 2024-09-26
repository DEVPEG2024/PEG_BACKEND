import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { findProductsByCategory, getProducts, getProductsByCustomer } from '../../controllers/products/find.controller';
import { createProduct } from '../../controllers/products/create.controller';
import { updateProduct, updateProductStatus } from '../../controllers/products/update.controller';
import { deleteProduct } from '../../controllers/products/delete.controller';
import { getCategoryProduct, createCategoryProduct, updateCategoryProductById, deleteCategoryProductById } from '../../controllers/products/cat_product.controller';

// Products routes Admin
router.get('/admin/', authMiddleware, getProducts);
router.post('/admin/create', authMiddleware, createProduct);
router.put('/admin/update', authMiddleware, updateProduct);
router.put('/admin/update-status/:id', authMiddleware, updateProductStatus);
router.delete('/admin/delete/:id', authMiddleware, deleteProduct);

// Category Product
router.get('/admin/category-product', authMiddleware, getCategoryProduct);
router.post('/admin/category-product/create', authMiddleware, createCategoryProduct);
router.put('/admin/category-product/update/:id', authMiddleware, updateCategoryProductById);
router.delete('/admin/category-product/delete/:id', authMiddleware, deleteCategoryProductById);

// Products by customer
router.get('/customer', authMiddleware, getProductsByCustomer);
router.get('/category/:id', authMiddleware, findProductsByCategory);

export default router;
