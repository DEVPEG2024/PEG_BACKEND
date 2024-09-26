import { Request, Response } from 'express';
import Project from '../../models/Project';
  
// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const info = {
      ...data,
      producer: data.producer._id,
      customer: data.customer._id,
      
    }
    const project = await Project.findByIdAndUpdate(data._id, info, { new: true });
    if (project) {
      return res.status(200).json({
        result: true,
        message: "Projet modifié avec succès",
        project,
      });
    }
    res.status(404).json({
      result: false,
      message: "Projet non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du projet",
      error,
    });
  }
};

// Update project status
export const updateProjectStatus = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const project = await Project.findById(data.id);
    if (project) {
      project.status = data.status;
      await project.save();
      return res.status(200).json({
        result: true,
        message: "Projet modifié avec succès",
        project,
      });
    }
    res.status(404).json({
      result: false,
      message: "Projet non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du projet",
      error,
    });
  }
};
