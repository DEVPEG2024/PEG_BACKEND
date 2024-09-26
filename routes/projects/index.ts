import express from 'express';

const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getProjects, getProjectsByCustomer, getProjectsByProducer } from '../../controllers/projects/find.controller';
import { getInvoicesProject } from '../../controllers/projects/invoiceProject.controller';
import { createInvoice, updateInvoice, deleteInvoice } from '../../controllers/projects/invoiceProject.controller';
import { createProject } from '../../controllers/projects/create.controller';
import { updateProject } from '../../controllers/projects/update.controller';
import { deleteProject } from '../../controllers/projects/delete.controller';
import { addComment, deleteComment } from '../../controllers/projects/comment.controller';
import { addFile, deleteFile } from '../../controllers/projects/files.controller';
import { addTask, deleteTask, updateTask, updateTaskStatus } from '../../controllers/projects/tasks.controller';


// Projects routes Admin
router.get('/admin/', authMiddleware, getProjects);
router.get('/admin/invoices/:id', authMiddleware, getInvoicesProject);
router.post('/admin/invoices/create', authMiddleware, createInvoice);
router.put('/admin/invoices/edit/:id', authMiddleware, updateInvoice);
router.delete('/admin/invoices/delete/:id', authMiddleware, deleteInvoice);
router.post('/admin/create',authMiddleware, createProject);
router.put('/admin/edit/:id',authMiddleware, updateProject);
router.delete('/admin/delete/:id',authMiddleware, deleteProject);
// Comments routes
router.post('/admin/comment/create',authMiddleware, addComment);
router.put('/admin/comment/delete/:id',authMiddleware, deleteComment);
// Files routes
router.post('/admin/upload-file',authMiddleware, addFile);
router.delete('/admin/delete-file',authMiddleware, deleteFile);
// Tasks routes
router.post('/admin/task/create',authMiddleware, addTask);
router.put('/admin/task/update/:id',authMiddleware, updateTask);
router.put('/admin/task/update-status/:id',authMiddleware, updateTaskStatus);
router.delete('/admin/task/delete/:id',authMiddleware, deleteTask);

// Projects routes User
router.get('/customer', authMiddleware, getProjectsByCustomer);
router.get('/producer', authMiddleware, getProjectsByProducer);
router.get('/:id', authMiddleware, getProjects);

export default router;
