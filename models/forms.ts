import mongoose, { Schema, Document } from 'mongoose';

interface IField extends Document {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  options?: string[];
  inputType?: string;
  rows?: number;
  defaultDate?: Date | null;
  acceptedFileTypes?: string;
  min?: number;
  max?: number;
  defaultColor?: string;
}

export interface IForm extends Document {
  title: string;
  fields: IField[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deleted: boolean;
}

const FieldSchema: Schema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  options: { type: [String] },
  inputType: { type: String },
  rows: { type: Number },
  defaultDate: { type: Date },
  acceptedFileTypes: { type: String },
  min: { type: Number },
  max: { type: Number },
  defaultColor: { type: String },
});

const FormSchema: Schema = new Schema({
  title: { type: String, required: true },
  fields: [FieldSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false },
});

export default mongoose.model<IForm>('Form', FormSchema);
