import { Request, Response } from 'express';
import Product from '../../models/Product';


// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      return res.status(200).json({
        result: true,
        message: "Produit supprimé avec succès",
        product,
      });
    }
    res.status(404).json({
      result: false,
      message: "Produit non trouvé",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du produit",
      error,
    });
  }
};
