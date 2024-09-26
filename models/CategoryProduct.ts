import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoryProduct extends Document {
  _id: string;
  title: string;
  image: string;
  products: string[];
}

const CategoryProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', default: [] }],
});


const CategoryProduct = mongoose.model<ICategoryProduct>('Category_Product', CategoryProductSchema);
export default CategoryProduct;
