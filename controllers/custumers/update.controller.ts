import { Request, Response } from 'express';
import User from '../../models/User';


// Update customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndUpdate(data._id, data, { new: true });
    if (user) {
      return res.status(200).json({
        result: true,
        message: "Client modifié avec succès",
        user,
      });
    }
    res.status(404).json({
      result: false,
      message: "Client non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du client",
      error,
    });
  }
};

// Update customer status
export const updateCustomerStatus = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await User.findById(data.id);
    if (user) {
      user.status = !user.status;
      await user.save();
      return res.status(200).json({
        result: true,
        message: "Client modifié avec succès",
        user,
      });
    }
    res.status(404).json({
      result: false,
      message: "Client non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du client",
      error,
    });
  }
};
