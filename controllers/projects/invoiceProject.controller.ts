import { Request, Response } from 'express';
import Invoice from '../../models/Invoice';


// Get all invoices of a project
export const getInvoicesProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoices = await Invoice.find({ projectId: id });
    if (!invoices) {
      return res.status(404).json({
        result: false,
        message: "Aucune facture trouvée",
      });
    }
  
    res.status(200).json({
      result: true,
      invoices,
      message: "Factures trouvées",
      });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la récupération des factures",
      error,
    });
  }
};


// Create new invoice
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { projectId, invoice, customerId, sellerId } = req.body;
    const newInvoice = new Invoice({
      projectId,
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
    const { id } = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    if (!deletedInvoice) {
      return res.status(404).json({
        result: false,
        message: "Facture non trouvée",
      });
    }   
    res.status(200).json({
      result: true,
      invoiceId: id,
      message: "Facture supprimée",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression de la facture",
      error,
    });
  }
};
