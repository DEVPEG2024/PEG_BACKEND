import { Request, Response } from 'express';
import Wallet from '../../models/Wallet';

// Pay a Producer project
export const payProducer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const wallet = await Wallet.findOne({ userId: data.producerId });
    if (!wallet) {
      return res.status(404).json({
        result: false,
        message: "Wallet non trouvée",
      });
    }
    wallet.balance += data.amount;
    wallet.transactions.push({
      projectId: data.projectId,
      amount: data.amount,
      date: new Date(),
    });
    await wallet.save();
    res.status(200).json({
      result: true,
      wallet,
      message: "Paiement effectué avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors du paiement",
      error,
    });
  }
};
