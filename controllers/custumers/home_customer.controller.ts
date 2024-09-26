import { Request, Response } from 'express';
import User from '../../models/User';
import Banner from '../../models/banner';
import Product from '../../models/Product';
import Order from '../../models/Order';




// Get Dashboard Home Customer
export const getDashboardHomeCustomer = async (req: Request, res: Response) => {
  try {
    const banner = await Banner.find({ status: "active", customer: req.params.id});
    const products = await Product.find({ customers: { $in: [req.params.id] } }).limit(3);
    const ordersCount = await Order.countDocuments({ customer: req.params.id });
    const level = ordersCount === 0 ? 1 : ordersCount > 30 ? 4 : ordersCount > 20 ? 3 : ordersCount > 10 ? 2 : 1;
    res.json({
      result: true,
      banner,
      products,
      level,
      message: 'Clients récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des clients',
      error: (error as Error).message
    });
  }
};
