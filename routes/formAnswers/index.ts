import express from 'express';
import authMiddleware from '../../middleware/authMiddleware';
import { createFormAnswer, updateFormAnswer, deleteFormAnswer } from '../../controllers/formAnswers/formAnswer';

const router = express.Router();

// Team
router.post('/create', authMiddleware, createFormAnswer);
router.put('/edit/:id', authMiddleware, updateFormAnswer);
router.delete('/delete/:id', authMiddleware, deleteFormAnswer);

export default router;