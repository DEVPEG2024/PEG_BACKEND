import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getTickets, createTicket, updateTicket, updateTicketStatus, deleteTicket } from '../../controllers/tickets/ticket';


// Team
router.get('/', authMiddleware, getTickets);
router.post('/create', authMiddleware, createTicket);
router.put('/edit/:id', authMiddleware, updateTicket);
router.put('/update-status/:id', authMiddleware, updateTicketStatus);
router.delete('/delete/:id', authMiddleware, deleteTicket);

export default router;
