import { Request, Response } from 'express';
import Project from '../../models/Project';

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const projects = await Project.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Project.countDocuments(searchQuery);

    res.json({
      result: true,
      projects,
      total,
      message: 'Projets récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des projets',
      error: (error as Error).message
    });
  }
};

// Get all projects by customer
export const getProjectsByCustomer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";
    const customer = req.query.customerId as string || "";
    const skip = (page - 1) * pageSize;

    const searchQuery = {
      customer,
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const projects = await Project.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Project.countDocuments(searchQuery);

    res.json({
      result: true,
      projects,
      total,
      message: 'Projets récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des projets',
      error: (error as Error).message
    });
  }
};

// Get all projects by producer
export const getProjectsByProducer = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";
    const producer = req.query.producerId as string || "";
    const skip = (page - 1) * pageSize;

    const searchQuery = {
      producer,
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const projects = await Project.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Project.countDocuments(searchQuery);

    res.json({
      result: true,
      projects,
      total,
      message: 'Projets récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des projets',
      error: (error as Error).message
    });
  }
};
