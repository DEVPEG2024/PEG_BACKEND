import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IFormAnswer extends Document {
  form: ObjectId;
  answers: Record<string, any>,
  customer: ObjectId,
  product: ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const FormAnswerSchema: Schema = new Schema({
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: {type: Schema.Types.Mixed, required: true},
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFormAnswer>('FormAnswer', FormAnswerSchema);
