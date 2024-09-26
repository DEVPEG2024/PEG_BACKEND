import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';

import { getInvoices, getInvoicesByCustomer } from '../../controllers/invoices/invoice.controller';
import { createInvoice } from '../../controllers/invoices/invoice.controller';
import { updateInvoice } from '../../controllers/invoices/invoice.controller';
import { deleteInvoice } from '../../controllers/invoices/invoice.controller';

// Team
router.get('/admin/', authMiddleware, getInvoices);
router.post('/admin/create', authMiddleware, createInvoice);
router.put('/admin/edit/:id', authMiddleware, updateInvoice);
router.put('/admin/update-status/:id', authMiddleware, updateInvoice);
router.delete('/admin/delete/:id', authMiddleware, deleteInvoice);

// Invoices by customer
router.get('/customer', authMiddleware, getInvoicesByCustomer);

export default router;
