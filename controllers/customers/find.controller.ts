import { Request, Response } from 'express';
import User from '../../models/User';




// Get all customers
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      authority: { $in: ["customer"] },
      ...(searchTerm
        ? {
            $or: [
              { firstName: { $regex: searchTerm, $options: "i" } },
              { lastName: { $regex: searchTerm, $options: "i" } },
              { email: { $regex: searchTerm, $options: "i" } },
              { phone: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const customers = await User.find(searchQuery)
      .skip(skip)
      .limit(pageSize);

    const total = await User.countDocuments(searchQuery);

    res.json({
      result: true,
      customers,
      total,
      message: 'Clients récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des clients',
      error: (error as Error).message
    });
  }
};
