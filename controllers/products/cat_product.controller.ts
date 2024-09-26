import { Request, Response } from 'express';
import CategoryProduct from '../../models/CategoryProduct';
import Product from '../../models/Product';


// Get all categories product
export const getCategoryProduct = async (req: Request, res: Response) => {
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

    const categories = await CategoryProduct.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    const products = await Product.find({ category: { $in: categories.map(category => category._id) } });
    const categoriesWithTotal = categories.map(category => {
      const totalProducts = products.filter(product => 
        product.category.includes(category._id.toString())
      ).length;
      return {
        ...category.toObject(),
        totalProducts
      };
    });
    console.log(categoriesWithTotal);
    const total = await CategoryProduct.countDocuments(searchQuery);
    
    res.json({
      result: true,
      categories: categoriesWithTotal,
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

// Create new category product
export const createCategoryProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const categoryProduct = new CategoryProduct({
      ...data,
    });
    await categoryProduct.save();
    res.json({
      result: true,
      categoryProduct,
      message: "Catégorie de produit créée avec succès",
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la création de la catégorie de produit",
      error,
    });
  }
};

// Delete category product by id
export const deleteCategoryProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CategoryProduct.findByIdAndDelete(id);
    res.json({
      result: true,
      message: "Catégorie de produit supprimée avec succès",
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la suppression de la catégorie de produit",
      error,
    });
  }
};

// Update category product by id
export const updateCategoryProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await CategoryProduct.findByIdAndUpdate(id, data);
    res.json({
      result: true,
      message: "Catégorie de produit modifiée avec succès",  
    });
  } catch (error) {
    res.json({
      result: false,
      message: "Erreur lors de la modification de la catégorie de produit",
      error,
    });
  }
};
