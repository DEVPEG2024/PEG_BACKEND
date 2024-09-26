import mongoose, {  Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
interface Items {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  _id: string; // Identifiant 
  sellerId: string; // Identifiant du vendeur
  customerId: string; // Identifiant du client
  amount: number; // Montant de la facture
  vat: number; // Taux de TVA
  vatAmount: number; // Montant de la TVA
  totalAmount: number; // Montant total de la facture
  projectId: string | null; // Identifiant du projet
  offerId: string | null; // Identifiant de l'offre
  invoiceNumber: string; // Numéro de la facture
  invoiceDate: Date; // Date de la facture
  dueDate: Date; // Date d'échéance de la facture
  paymentDate: Date; // Date de paiement de la facture
  paymentMethod: string; // Méthode de paiement
  paymentStatus: string; // Statut du paiement
  paymentReference: string; // Référence du paiement
  paymentAmount: number; // Montant du paiement
  items: Items[]; // Liste des items de la facture
  status: string; // Statut de la facture
  createdAt: Date; // Date de création de la facture
}

const InvoiceSchema = new Schema<Invoice>({
  sellerId: {
    type: String,
    ref: "User",
    required: true,
    autopopulate: {
      select: "_id companyName firstName lastName email phone address city zip vat siret logo",
    },
  },
  customerId: {
    type: String,
    ref: "User",
    required: true,
    autopopulate: {
      select:
        "_id companyName firstName lastName email phone address city zip",
    },
  },
  amount: { type: Number, required: true, default: 0 },
  vat: { type: Number, required: false, default: 0 },
  vatAmount: { type: Number, required: false, default: 0 },
  totalAmount: { type: Number, required: false, default: 0 },
  projectId: {
    type: String,
    ref: "Project",
    required: false,
    autopopulate: {
      select : '_id title ref amount'
    },
  },
  offerId: { type: String, ref: "Offer", required: false, autopopulate: {
    autopopulate: {
      select : '_id title ref amount'
    },
  } },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  dueDate: { type: Date, required: false },
  paymentDate: { type: Date, required: false },
  paymentMethod: { type: String, required: false },
  paymentStatus: { type: String, required: false },
  paymentReference: { type: String, required: false },
  paymentAmount: { type: Number, required: false },
  status: { type: String, required: true, default: "pending" },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

InvoiceSchema.plugin(autopopulate);

const Invoice = mongoose.model<Invoice>('Invoice', InvoiceSchema);
export default Invoice;
