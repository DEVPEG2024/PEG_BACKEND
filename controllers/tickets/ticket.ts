import { Request, Response } from 'express';
import Ticket from '../../models/Ticket';


// Get all tickets 
export const getTickets = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const tickets = await Ticket.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    
    console.log(tickets)
    const total = await Ticket.countDocuments(searchQuery);

    res.json({
      result: true,
      tickets,
      total,
      message: 'Tickets récupérées avec succès'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des tickets',
      error: (error as Error).message
    });
  }
};


// Create new ticket
export const createTicket = async (req: Request, res: Response) => {
  try {
    const { ticket, userId } = req.body;

    const newTicket = new Ticket({
      ref: ticket.ref,
      user: userId,
      team: null,
      file: ticket.file,
      type: ticket.type,
      title: ticket.title,
      description: ticket.description,
      status: "open",
      priority: ticket.priority,
      
    });
      await newTicket.save();
    res.status(201).json({
      result: true,
      ticket: newTicket,
      message: "Ticket créé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du ticket",
      error,
    });
  }
};

// Update ticket
export const updateTicket = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    const { ticket } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, ticket, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({
        result: false,
        message: "Ticket non trouvé",
      });
    }
    res.status(200).json({
      result: true,
      ticket: updatedTicket,
      message: "Ticket mise à jour",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la mise à jour du ticket",
      error,
    });
  }
};

// Delete ticket
export const deleteTicket = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    console.log(id)
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({
        result: false,
        message: "Ticket non trouvé",
      });
    }   
    res.status(200).json({
      result: true,
      ticketId: id,
      message: "Ticket supprimé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du ticket",
      error,
    });
  }
};

// Update ticket status
export const updateTicketStatus = async (req: Request, res: Response) => { 
  try {
    const { ticketId, status, priority } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { status, priority }, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({
        result: false,
        message: "Ticket non trouvé",
      });
    }
    res.status(200).json({
      result: true,
      ticketId: ticketId,
      ticket: updatedTicket,
      message: "Statut du ticket mis à jour",
    });   
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la mise à jour du statut du ticket",
      error,
    });
  }
};
