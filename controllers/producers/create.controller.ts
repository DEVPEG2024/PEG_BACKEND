import { Request, Response } from 'express';
import User from '../../models/User';
import CategoryProducer from '../../models/CategoryProducer';
import Wallet from '../../models/Wallet';

const generateFakePassword = () => {
  return Math.random().toString(36).slice(2, 10);
};

// Create new producer
export const createProducer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        result: false,
        message: "Cette adresse email est déjà utilisée",
      });
    }
 
    const producer = new User({
      ...data,
      password: "Peg2025",
      authority: ["producer"],
      categoryType: "Category_Producer",
    });
    await producer.save();
    const wallet = new Wallet({
      userId: producer._id,
      balance: 0,
    });
    await wallet.save();
    const category = await CategoryProducer.findById(data.category);
    if (category) {
      category.producers.push(producer._id);
      await category.save();
    }
    res.status(200).json({
      result: true,
      producer,
      message: "Producteur créé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du producteur",
      error,
    });
  }
};
