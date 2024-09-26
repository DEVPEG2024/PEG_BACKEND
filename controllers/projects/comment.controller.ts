import { Request, Response } from 'express';
import Project, { IComment, IFile } from '../../models/Project';
import mongoose from 'mongoose';
// Create new producer
export const addComment = async (req: Request, res: Response) => {
  try {
      const { comment, projectId, user, file, fileType } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      comment: comment as string,
      user: user as string,
      file: file as string,
      fileType: fileType as string,
      createdAt: new Date(),
    };
    const fileData = {
      _id: new mongoose.Types.ObjectId(),
      file: file as string,
      fileType: fileType as string,
      createdAt: new Date(),
    };
    if (file && fileType) {
      project.files.push(fileData as IFile);
    }
    project.comments.push(newComment as IComment);
    await project.save();
    res.status(200).json({
      result: true,
      comment : newComment,
      file : fileData,
      message: "Projet créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du projet",
      error,
    });
  }
};


// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    const comment = project.comments.find((comment: IComment) => comment._id.toString() === id);
    if (!comment) {
      return res.status(404).json({
        result: false,
        message: "Commentaire non trouvé",
      });
    }
    project.comments = project.comments.filter((comment: IComment) => comment._id.toString() !== id);
    await project.save();
    res.status(200).json({
      result: true,
      project,
      message: "Commentaire supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du commentaire",
      error,
    });
  }
};
