import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getProducers } from '../../controllers/producers/find.controller';
import {
  createCategoryProducer,
  updateCategoryProducerById,
  getCategoriesProducer,
  deleteCategoryProducerById,
} from "../../controllers/producers/cat_producer.controller";
import { createProducer } from '../../controllers/producers/create.controller';
import { updateProducer, updateProducerStatus } from '../../controllers/producers/update.controller';
import { deleteProducer } from '../../controllers/producers/delete.controller';
import { getDashboardHomeProducer } from '../../controllers/producers/home_producer.controller';

// Producer
router.get('/admin/', authMiddleware, getProducers);
router.post('/admin/create', authMiddleware, createProducer);
router.put('/admin/update', authMiddleware, updateProducer);
router.put('/admin/update-status', authMiddleware, updateProducerStatus);
router.delete('/admin/delete', authMiddleware, deleteProducer);
// Category Producer    
router.post('/admin/category/create', authMiddleware, createCategoryProducer);
router.put('/admin/category/update/:id', authMiddleware, updateCategoryProducerById);
router.get('/admin/category', authMiddleware, getCategoriesProducer);
router.delete('/admin/category/delete/:id', authMiddleware, deleteCategoryProducerById);

// Producer
router.get('/home/:id', authMiddleware, getDashboardHomeProducer);
export default router;
