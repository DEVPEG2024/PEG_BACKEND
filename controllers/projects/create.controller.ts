import { Request, Response } from 'express';
import Project from '../../models/Project';

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, amount, amountProducers, customer, producer, startDate, endDate, ref, priority, status, order } = req.body;
    const amountRound = Number(amount);
    const amountProducersRound = Number(amountProducers);
    const project = new Project({
      title,
      ref,
      description,
      amount : amountRound,
      amountProducers: amountProducersRound,
      fullDescription : "",
      progress: 0,
      customer,
      producer,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      status: status || 'pending',
      priority: priority || 'low',
      order,
    });
    await project.save();
    res.status(200).json({
      result: true,
      project,
      message: "Projet créé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du projet",
      error,
    });
  }
};
