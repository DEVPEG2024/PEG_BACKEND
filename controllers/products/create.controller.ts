import { Request, Response } from 'express';
import Product from '../../models/Product';
import CategoryProduct, { ICategoryProduct } from '../../models/CategoryProduct';

// Create new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    delete data._id;
    const product = new Product(data);
    const categoriesProduct = await getCategoriesLinked(data.category)
    const newIdProduct = product._id as unknown as string;
    categoriesProduct.forEach((category) => addProductToCategory(category, newIdProduct))
    await product.save();
    res.status(200).json({
      result: true,
      product,
      message: "Produit créé avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du produit",
      error,
    });
  }
};

const getCategoriesLinked = async (categories: string[]): Promise<ICategoryProduct[]> => {
  if (categories.length > 0) {
    const categoriesLinked: (ICategoryProduct | null)[] = await Promise.all(categories.map(async (categoryName: string) => {
      const category = await CategoryProduct.findById(categoryName)

      return category
    }))

    return categoriesLinked.filter((category): category is ICategoryProduct => category !== null)
  }

  return CategoryProduct.find()
}

const addProductToCategory = async (category: ICategoryProduct, newIdProduct: string) : Promise<void> => {
  category.products.push(newIdProduct);
  await category.save();
}