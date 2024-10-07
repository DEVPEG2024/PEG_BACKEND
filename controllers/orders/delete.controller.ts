import { Request, Response } from 'express';
import Product from '../../models/Product';
import Order from '../../models/Order';


// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (order) {
      return res.status(200).json({
        result: true,
        message: "Commande supprimée avec succès",
        order,
      });
    }
    res.status(404).json({
      result: false,
      message: "Commande non trouvée",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression de la commande",
      error,
    });
  }
};
