import { Request, Response } from 'express';
import User from '../../models/User';
import Wallet from '../../models/Wallet';

// Get all producers
export const getTeams = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      authority: { $in: [ "admin", 'user', 'accountant', 'publisher'] },
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

    const teams = await User.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    
      const teamsWithWallet = await Promise.all(teams.map(async (team) => {
        const wallet = await Wallet.findOne({ userId: team._id });
        return {
          ...team.toObject(),
          wallet: wallet?.balance || 0
        };
      }));
    
   
    const total = await User.countDocuments(searchQuery);

    res.json({
      result: true,
      teams: teamsWithWallet,
      total,
      message: 'Equipes récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des équipes',
      error: (error as Error).message
    });
  }
};
