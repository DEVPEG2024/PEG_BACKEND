import { Request, Response } from 'express';
import Order from '../../models/Order';
import Project from '../../models/Project';
import Wallet from '../../models/Wallet';




// Get Dashboard Home Producer
export const getDashboardHomeProducer = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ producer: req.params.id }).limit(2);
    const ordersCount = await Project.countDocuments({ producer: req.params.id });
    const wallet = await Wallet.findOne({ userId: req.params.id });
    const level = ordersCount === 0 ? 1 : ordersCount > 30 ? 4 : ordersCount > 20 ? 3 : ordersCount > 10 ? 2 : 1;
    res.json({
      result: true,
      projects,
      level,
      wallet,
      message: 'Projets récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des projets',
      error: (error as Error).message
    });
  }
};
