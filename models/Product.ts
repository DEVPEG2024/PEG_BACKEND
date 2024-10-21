import mongoose, {  Schema } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';
export type IProduct = {
  title: string,
  reference: string,
  description: string,
  amount: number,
  stock: number,
  category: string[],
  customersCategories: string[],
  form: string;
  customers: string[],
  images: FileNameBackFront[],
  isActive: boolean,
  isDeleted: boolean,
  date: Date,
  field_name : boolean,
  field_number : boolean,
  field_text : boolean,
  fields: ProductForm[],
  sizes: {
    status: boolean,
    options: OptionsFields[]
  }
  status: string,
}

export type ProductForm = {
  label: string;
  value: string;
  status: boolean;
  options: OptionsFields[];
};

export type OptionsFields = {
  label: string;
  value: string;
  stock: number;
};

export type FileNameBackFront = {
  fileNameBack: string
  fileNameFront: string
}

const FileNameBackFrontSchema = new Schema<FileNameBackFront>({
  fileNameBack: { type: String, required: true },
  fileNameFront: { type: String, required: true }
});

const OptionsFieldsSchema = new Schema<OptionsFields>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  stock: { type: Number, required: true },
});

const ProductFormSchema = new Schema<ProductForm>({
  label: { type: String, required: true },
  value: { type: String, required: true },
  status: { type: Boolean, required: true },
  options: { type: [OptionsFieldsSchema], required: true },
});
const ProductSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    reference: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    stock: { type: Number, required: false, default: 0 },
    images: { type: [FileNameBackFrontSchema], required: false },
    isActive: { type: Boolean, required: false, default: true },
    isDeleted: { type: Boolean, required: false, default: false },
    date: { type: Date, required: false, default: Date.now },
    category: { type: [String], ref: 'Category_Product', required: false },
    customersCategories: { type: [String], ref: 'Category_Customer', required: false },
    form: { type: String, ref: 'Form', required: false,  autopopulate: {
      select: '_id title fields'
    } },
    customers: { type: [String], ref: 'User', required: false },
    sizes: {
      status: { type: Boolean, required: false },
      options: { type: [OptionsFieldsSchema], required: false }
    },
    fields: { type: [ProductFormSchema], required: false },
    field_text: { type: Boolean, required: false, default: false },
    status: { type: String, required: false, default: 'online' },
});

ProductSchema.plugin(mongooseAutopopulate);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
