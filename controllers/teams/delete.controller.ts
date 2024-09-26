import { Request, Response } from 'express';
import User from '../../models/User';



// Delete team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndDelete(data.id);
    if (user) {
      return res.status(200).json({
        result: true,
        message: "Equipe supprimée avec succès",
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
      message: "Erreur lors de la suppression de l'équipe",
      error,
    });
  }
};
