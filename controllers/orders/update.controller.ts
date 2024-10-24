import { Request, Response } from 'express';
import Order from '../../models/Order';

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId: id, status } = req.body;
    const order = await Order.findById(id);
    if (order) {
      order.status = status;
      await order.save();
      return res.status(200).json({
        result: true,
        message: "Commande modifiée avec succès",
        order,
      });
    }
    res.status(404).json({
      result: false,
      message: "Commande non trouvée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification de la commande",
      error,
    });
  }
};
// TODO: Ajouter MAJ commande succès ou échec

// Update order payment status
export const updateOrderPaymentStatus = async (req: Request, res: Response) => {
  try {
    const { orderId: id, status } = req.body;
    const order = await Order.findById(id);
    if (order) {
      order.paymentStatus = status;
      await order.save();
      return res.status(200).json({
        result: true,
        message: "Commande modifiée avec succès",
        order,
      });
    }
    res.status(404).json({
      result: false,
      message: "Commande non trouvée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification de la commande",
      error,
    });
  }
};