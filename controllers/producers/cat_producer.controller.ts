import { Request, Response } from 'express';
import CategoryProducer from '../../models/CategoryProducer';


// Get all categories producer
export const getCategoriesProducer = async (req: Request, res: Response) => {
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
            ],
          }
        : {}),
    };

    const categories = await CategoryProducer.find(searchQuery)
      .skip(skip)
      .limit(pageSize);

    const total = await CategoryProducer.countDocuments(searchQuery);
    const formattedCategories = categories.map(prod => ({
      _id: prod._id,
      label: prod.title,
      value: prod._id,
      producers: (prod as any).producers?.length || 0
    }));
    res.json({
      result: true,
      categories : formattedCategories,
      total,
      message: 'Catégories de producteurs récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des catégories de producteurs',
      error: (error as Error).message
    });
  }
};

// Create new category producer
export const createCategoryProducer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);
    const categoryProducer = new CategoryProducer({
      ...data,
    });
    await categoryProducer.save();
    console.log(categoryProducer);
    res.json({
      result: true,
      categoryProducer,
      message: "Catégorie de producteur créée avec succès",
    });
  } catch (error) {
    console.log(error);
    res.json({
      
      result: false,
      message: "Erreur lors de la création de la catégorie de producteur",
      error,
    });
  }
};

// Delete category producer by id
export const deleteCategoryProducerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    await CategoryProducer.findByIdAndDelete(id);
    res.json({
      result: true,
      message: "Catégorie de producteur supprimée avec succès",
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la suppression de la catégorie de producteur",
      error,
    });
  }
};

// Update category producer by id
export const updateCategoryProducerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await CategoryProducer.findByIdAndUpdate(id, data);
    res.json({
      result: true,
      message: "Catégorie de producteur modifiée avec succès",  
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la modification de la catégorie de producteur",
      error,
    });
  }
};
