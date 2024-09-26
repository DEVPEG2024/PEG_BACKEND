import { Request, Response } from 'express';
import User from '../../models/User';


// Update team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { wallet, ...dataToUpdate } = req.body;

    const user = await User.findByIdAndUpdate(dataToUpdate._id, dataToUpdate, { new: true });
    if (user) {
      return res.status(200).json({
        result: true,
        message: "Equipe modifiée avec succès",
        user,
      });
    }
    res.status(404).json({
      result: false,
      message: "Equipe non trouvée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification de l'équipe",
      error,
    });
  }
};

// Update team status
export const updateTeamStatus = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const user = await User.findById(data.id);
    if (user) {
      user.status = !user.status;
      await user.save();
      return res.status(200).json({
        result: true,
        message: "Equipe modifiée avec succès",
        user,
      });
    }
    res.status(404).json({
      result: false,
      message: "Equipe non trouvée",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification de l'équipe",
      error,
    });
  }
};
