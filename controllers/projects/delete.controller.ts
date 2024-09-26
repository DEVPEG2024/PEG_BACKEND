import { Request, Response } from 'express';
import Project from '../../models/Project';


// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndDelete(id);
    if (project) {
      return res.status(200).json({
        result: true,
        message: "Projet supprimé avec succès",
        project,
      });
    }
    res.status(404).json({
      result: false,
      message: "Projet non trouvé",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du projet",
      error,
    });
  }
};
