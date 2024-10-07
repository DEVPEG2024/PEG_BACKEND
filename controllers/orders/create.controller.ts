import { Request, Response } from 'express';
import Order from '../../models/Order';

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    delete data._id;
    const order = new Order(data);
    await order.save();
    res.status(200).json({
      result: true,
      order,
      message: "Commande créée avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création de la commande",
      error,
    });
  }
};
