import { Request, Response } from 'express';
import Order from '../../models/Product';

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const orders = await Order.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Order.countDocuments(searchQuery);

    res.json({
      result: true,
      orders,
      total,
      message: 'Commandes récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des commandes',
      error: (error as Error).message
    });
  }
};

// Get order by ID 
export const getOrderById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.json({ result: true, message: 'Commande trouvée avec succès', order });
    } catch (error) {
      res.status(500).json({ result: false, message: 'Erreur lors de la recherche de la commande', error: (error as Error).message });
    }
};

// Get all ongoing orders by customer
export const getOngoingOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";
    const customerId = req.query.userId as string || "";
    const skip = (page - 1) * pageSize;

    const searchQuery = [
      {
          $match: {
              $or: [
                  { title: { $regex: searchTerm, $options: 'i' } },
                  { description: { $regex: searchTerm, $options: 'i' } }
              ]
          }
      },
      {
          $match: {
              $and: [
                  {
                      $or: [
                          { customers: { $in: [customerId] } }
                      ]
                  },
                  { status: "ongoing" }
              ]
          }
      }
    ]

    const orders = await Order.aggregate(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Order.countDocuments(searchQuery);

    res.json({
      result: true,
      orders,
      total,
      message: 'Commandes récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des commandes',
      error: (error as Error).message
    });
  }
};


// find products by category
export const findProductsByCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const products = await Order.find({ category: { $in: [categoryId] } });
    res.json({
      result: true,
      products,
      message: 'Produits récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des produits',
      error: (error as Error).message
    });
  }
};
    