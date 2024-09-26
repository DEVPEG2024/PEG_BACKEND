import { Request, Response } from "express";
import Project, { IFile } from "../../models/Project";
import mongoose from "mongoose";

// Add file
export const addFile = async (req: Request, res: Response) => {
  try {
    const { file, fileType, projectId } = req.body;
    console.log(req.body)
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    const newFile = {
      _id: new mongoose.Types.ObjectId(),
      file,
      fileType,
      createdAt: new Date(),
    };
    project.files.push(newFile as IFile);
    await project.save();
    res.status(200).json({
      result: true,
      file: newFile,
      message: "Fichier ajouté avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de l'ajout du fichier",
      error,
    });
  }
};
// Delete file
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { fileId, projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    project.files = project.files.filter(
      (file) => file._id.toString() !== fileId
    );
    await project.save();
    res.status(200).json({
      result: true,
      message: "Fichier supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du fichier",
      error,
    });
  }
};


