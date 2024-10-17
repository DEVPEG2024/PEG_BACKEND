import { Request, Response } from 'express';
import User from '../../models/User';
import CategoryCustomer from '../../models/CategoryCustomer';

const generateFakePassword = () => {
  return Math.random().toString(36).slice(2, 10);
};

// Create new customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email });
    if (user) {
      return res.status(400).json({
        result: false,
        message: "Cette adresse email est déjà utilisée",
      });
    }
    const customer = new User({
      ...data,
      password: "Peg2025",
      authority: ["customer"],
      categoryType: "Category_Customer",
    });
    await customer.save();
    const category = await CategoryCustomer.findById(data.category);
    if (category) {
      category.customers.push(customer._id);
      await category.save();
    }
    res.status(200).json({
      result: true,
      customer,
      message: "Client créé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du client",
      error,
    });
  }
};
