import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoryCustomer extends Document {
  _id: string;
  title: string;
  customers: string[];
}

const CategoryCustomerSchema: Schema = new Schema({
  title: { type: String, required: true },
  customers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});


const CategoryCustomer = mongoose.model<ICategoryCustomer>('Category_Customer', CategoryCustomerSchema);
export default CategoryCustomer;
