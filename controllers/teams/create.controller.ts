import { Request, Response } from 'express';
import User from '../../models/User';
import CategoryProducer from '../../models/CategoryProducer';
import Wallet from '../../models/Wallet';

const generateFakePassword = () => {
  return Math.random().toString(36).slice(2, 10);
};

// Create new team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        result: false,
        message: "Cette adresse email est déjà utilisée",
      });
    }
 
    const team = new User({
      ...data,
      password: generateFakePassword(),
      authority: [data.authority],
      categoryType: null,
    });
    await team.save();
    const wallet = new Wallet({
      userId: team._id,
      balance: 0,
    });
    await wallet.save();
  
    res.status(200).json({
      result: true,
      team,
      message: "Equipe créée avec succès",
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
