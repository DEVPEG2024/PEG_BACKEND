import { Request, Response } from 'express';
import Product from '../../models/Product';
import CategoryProduct from '../../models/CategoryProduct';
import Order from '../../models/Order';

// Update order status
/*export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      order.isActive = !order.isActive;
      await order.save();
      return res.status(200).json({
        result: true,
        message: "Produit modifié avec succès",
        product: order,
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
};*/
// TODO: Ajouter MAJ commande succès ou échec
