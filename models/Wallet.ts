import mongoose, {  Schema } from 'mongoose';

interface Transaction {
  projectId: string; // Identifiant du projet
  amount: number; // Montant de la transaction
  date: Date; // Date de la transaction
}

interface Wallet {
  _id: string; // Identifiant du wallet
  userId: string; // Identifiant de l'utilisateur
  balance: number; // Solde du wallet
  transactions: Transaction[]; // Transactions du wallet
  createdAt: Date; // Date de création du wallet
}

const TransactionSchema = new Schema<Transaction>({
  projectId: { type: String, ref: 'Project', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const WalletSchema = new Schema<Wallet>({
  userId: { type: String, ref: 'User', required: true },
  balance: { type: Number, required: true, default: 0 },
  transactions: [TransactionSchema],
  createdAt: { type: Date, default: Date.now },
});

const Wallet = mongoose.model<Wallet>('Wallet', WalletSchema);
export default Wallet;

