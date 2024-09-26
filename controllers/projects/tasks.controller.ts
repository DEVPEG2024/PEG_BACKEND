import { Request, Response } from 'express';
import Project, { ITask } from '../../models/Project';
import mongoose from 'mongoose';
// Create new task
export const addTask = async (req: Request, res: Response) => {
  try {
      const { task, projectId } = req.body;
      console.log(task);
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    
    const newTask = {
      _id: new mongoose.Types.ObjectId(),
      title: task.title as string,
      description: task.description as string,
      status: task.status as string,
      priority: task.priority as string,
      startDate: task.startDate as Date,
      endDate: task.endDate as Date,
      createdAt: new Date(),
    };
   
    project.tasks.push(newTask as ITask);
    await project.save();
    res.status(200).json({
      result: true,
      projectId: projectId,
      task : newTask,
      message: "Tâche créée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création de la tâche",
      error,
    });
  }
};


// Delete task
export const deleteTask = async (req: Request, res: Response) => {
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
    const task = project.tasks.find((task: ITask) => task._id.toString() === id);
    if (!task) {
      return res.status(404).json({
        result: false,
        message: "Tâche non trouvée",
      });
    }
    project.tasks = project.tasks.filter((task: ITask) => task._id.toString() !== id);
    await project.save();
    res.status(200).json({
      result: true,
      project,
      message: "Tâche supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression de la tâche",
      error,
    });
  }
};


// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { projectId, task } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    const taskToUpdate = project.tasks.find((task: ITask) => task._id.toString() === id);
    if (!taskToUpdate) {
      return res.status(404).json({
        result: false,
        message: "Tâche non trouvée",
      });
    }
    taskToUpdate.title = task.title;
    taskToUpdate.description = task.description;
    taskToUpdate.status = task.status;
    taskToUpdate.priority = task.priority;
    taskToUpdate.startDate = task.startDate;
    taskToUpdate.endDate = task.endDate;
    await project.save();
    res.status(200).json({
      result: true,
      project,
      message: "Tâche modifiée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification de la tâche",
      error,
    });
  }
};


// Update task status
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { projectId, status } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        result: false,
        message: "Projet non trouvé",
      });
    }
    const task = project.tasks.find((task: ITask) => task._id.toString() === id);
    console.log(task);
    if (!task) {
      return res.status(404).json({
        result: false,  
        message: "Tâche non trouvée",
      });
    }
    task.status = status;
    await project.save();
    res.status(200).json({
      result: true,
      projectId,
      task,
      message: "Statut de la tâche modifié avec succès",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la modification du statut de la tâche",
      error,
    });
  }
};
