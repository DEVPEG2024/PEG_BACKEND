import { Request, Response } from 'express';
import Product from '../../models/Product';

// Get all products
export const getProducts = async (req: Request, res: Response) => {
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

    const products = await Product.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Product.countDocuments(searchQuery);

    res.json({
      result: true,
      products,
      total,
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

// Get product by ID 
export const getProductById = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.json({ result: true, message: 'Produit trouvé avec succès', product });
    } catch (error) {
      res.status(500).json({ result: false, message: 'Erreur lors de la recherche du produit', error: (error as Error).message });
    }
};

// Get all products by customer
export const getProductsByCustomer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";
    const customerId = req.query.userId as string || "";
    const customerCategoryId = req.query.userCategoryId as string || "";
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
                          { customers: { $in: [customerId] } },
                          { customersCategories: { $in: [customerCategoryId] }, customers: { $size: 0 } },
                          { customersCategories: { $size: 0 }, customers: { $size: 0 } }
                      ]
                  },
                  { status: "online" }
              ]
          }
      }
    ]

    const products = await Product.aggregate(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Product.countDocuments(searchQuery);

    res.json({
      result: true,
      products,
      total,
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


// find products by category
export const findProductsByCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const products = await Product.find({ category: { $in: [categoryId] } });
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
    