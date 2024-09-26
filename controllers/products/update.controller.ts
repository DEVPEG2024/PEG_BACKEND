import { Request, Response } from 'express';
import Product from '../../models/Product';
import CategoryProduct from '../../models/CategoryProduct';
  
// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product = await Product.findByIdAndUpdate(data._id, data, { new: true });
    const categoryProduct = await CategoryProduct.findById(data.category);
    if (!categoryProduct) {
      return res.status(400).json({
        result: false,
        message: "Catégorie de produit non trouvée",
      });
    }
    const newIdProduct = product?._id as unknown as string;
    categoryProduct.products.push(newIdProduct);
    await categoryProduct.save();
    if (product) {
      return res.status(200).json({
        result: true,
        message: "Produit modifié avec succès",
        product,
      });
    }
    res.status(404).json({
      result: false,
      message: "Produit non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du produit",
      error,
    });
  }
};

// Update product status
export const updateProductStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      product.isActive = !product.isActive;
      await product.save();
      return res.status(200).json({
        result: true,
        message: "Produit modifié avec succès",
        product,
      });
    }
    res.status(404).json({
      result: false,
      message: "Produit non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du produit",
      error,
    });
  }
};
