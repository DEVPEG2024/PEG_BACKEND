import { Request, Response } from 'express';
import Invoice from '../../models/Invoice';


// Get all invoices 
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      ...(searchTerm
        ? {
            $or: [
              { invoiceNumber: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const invoices = await Invoice.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Invoice.countDocuments(searchQuery);

    res.json({
      result: true,
      invoices,
      total,
      message: 'Factures récupérées avec succès'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des factures',
      error: (error as Error).message
    });
  }
};


// Create new invoice
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { invoice, sellerId } = req.body;
    const { projectId, offerId, customerId } = invoice;
    console.log(projectId, offerId, customerId);

    const newInvoice = new Invoice({
      projectId: projectId || null,
      offerId: offerId || null,
      sellerId,
      customerId,
      ...invoice,
      createdAt: new Date(),
      status: "En attente",
    });
    await newInvoice.save();
    res.status(201).json({
      result: true,
      invoice: newInvoice,
      message: "Facture créée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création de la facture",
      error,
    });
  }
};

// Update invoice
export const updateInvoice = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    const { invoice } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({
        result: false,
        message: "Facture non trouvée",
      });
    }
    res.status(200).json({
      result: true,
      invoice: updatedInvoice,
      message: "Facture mise à jour",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la mise à jour de la facture",
      error,
    });
  }
};

// Delete invoice
export const deleteInvoice = async (req: Request, res: Response) => { 
  try {
    const { invoiceId } = req.body;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!deletedInvoice) {
      return res.status(404).json({
        result: false,
        message: "Facture non trouvée",
      });
    }   
    res.status(200).json({
      result: true,
      invoiceId: invoiceId,
      message: "Facture supprimée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression de la facture",
      error,
    });
  }
};



// Get invoices by customer
export const getInvoicesByCustomer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";
    const customerId = req.query.userId as string || "";
    const skip = (page - 1) * pageSize;

    const searchQuery = {
      customerId,
      ...(searchTerm
        ? {
            $or: [
              { invoiceNumber: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const invoices = await Invoice.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Invoice.countDocuments(searchQuery);

    res.json({
      result: true,
      invoices,
      total,
      message: 'Factures récupérées avec succès'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des factures',
      error: (error as Error).message
    });
  }
};
