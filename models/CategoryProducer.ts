import mongoose, { Document, Schema } from 'mongoose';

export interface ICategoryProducer extends Document {
  _id: string;
  title: string;
  producers: string[];
}

const CategoryProducerSchema: Schema = new Schema({
  title: { type: String, required: true },
  producers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});


const CategoryProducer = mongoose.model<ICategoryProducer>('Category_Producer', CategoryProducerSchema);
export default CategoryProducer;
