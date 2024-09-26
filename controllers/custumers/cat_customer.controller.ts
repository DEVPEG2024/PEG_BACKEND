import { Request, Response } from 'express';
import CategoryCustomer from '../../models/CategoryCustomer';


// Get all categories customer
export const getCategoriesCustomer = async (req: Request, res: Response) => {
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

    const categories = await CategoryCustomer.find(searchQuery)
      .skip(skip)
      .limit(pageSize);

    const total = await CategoryCustomer.countDocuments(searchQuery);
    const formattedCategories = categories.map(category => ({
      _id: category._id,
      label: category.title,
      value: category._id,
      customers: category.customers.length
    }));
    res.json({
      result: true,
      categories : formattedCategories,
      total,
      message: 'Categories récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des customers',
      error: (error as Error).message
    });
  }
};

// Create new category customer
export const createCategoryCustomer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const categoryCustomer = new CategoryCustomer({
      ...data,
    });
    await categoryCustomer.save();
    res.json({
      result: true,
      categoryCustomer,
      message: "Catégorie de client créée avec succès",
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la création de la catégorie de client",
      error,
    });
  }
};

// Delete category customer by id
export const deleteCategoryCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    await CategoryCustomer.findByIdAndDelete(id);
    res.json({
      result: true,
      message: "Catégorie de client supprimée avec succès",
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la suppression de la catégorie de client",
      error,
    });
  }
};

// Update category customer by id
export const updateCategoryCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await CategoryCustomer.findByIdAndUpdate(id, data);
    res.json({
      result: true,
      message: "Catégorie de client modifiée avec succès",  
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la modification de la catégorie de client",
      error,
    });
  }
};
