import mongoose, { Schema, Document } from 'mongoose';

export interface IFormAnswer extends Document {
  _id: string;
  formId: string;
  answers: [
    {
      fieldId: string;
      value: string | string[] | File[];
    }
  ]
  createdAt: Date;
}

const FormAnswerSchema: Schema = new Schema({
  formId: { type: String, required: true },
  answers: [{
    fieldId: {type: String, required: true, default: 'id'},
    value: { type: String, required: true, default: 0 }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFormAnswer>('FormAnswer', FormAnswerSchema);
