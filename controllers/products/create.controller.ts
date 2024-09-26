import { Request, Response } from 'express';
import Product from '../../models/Product';
import CategoryProduct from '../../models/CategoryProduct';

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    delete data._id;
    const product = new Product(data);
    const categoryProduct = await CategoryProduct.findById(data.category);
    if (!categoryProduct) {
      return res.status(400).json({
        result: false,
        message: "Catégorie de produit non trouvée",
      });
    }
    const newIdProduct = product._id as unknown as string;
    categoryProduct.products.push(newIdProduct);
    await categoryProduct.save();
    await product.save();
    res.status(200).json({
      result: true,
      product,
      message: "Produit créé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du projet",
      error,
    });
  }
};
