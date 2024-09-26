import { Request, Response } from 'express';
import User from '../../models/User';
import CategoryCustomer from '../../models/CategoryCustomer';



// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndDelete(data.id);
    if (user) {
      const category = await CategoryCustomer.findById(user.category);
      if (category) {
        category.customers = category.customers.filter(
          (customer) => customer.toString() !== user._id.toString()
        );
        await category.save();
      }
      return res.status(200).json({
        result: true,
        message: "Client supprimé avec succès",
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
      message: "Erreur lors de la suppression du client",
      error,
    });
  }
};
