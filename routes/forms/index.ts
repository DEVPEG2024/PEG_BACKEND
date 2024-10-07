import express from 'express';
import authMiddleware from '../../middleware/authMiddleware';
import { getForms, createForm, updateForm, deleteForm } from '../../controllers/forms/form';

const router = express.Router();

// Team
router.get('/', authMiddleware, getForms);
router.post('/create', authMiddleware, createForm);
router.put('/edit/:id', authMiddleware, updateForm);
router.delete('/delete/:id', authMiddleware, deleteForm);

export default router;