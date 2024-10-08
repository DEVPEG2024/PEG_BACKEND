import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IFormAnswer extends Document {
  formId: ObjectId;
  answers: Record<string, any>,
  customerId: ObjectId,
  productId: ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const FormAnswerSchema: Schema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: {type: Schema.Types.Mixed, required: true},
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFormAnswer>('FormAnswer', FormAnswerSchema);
