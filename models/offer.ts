import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface ICategoryProduct extends Document {
  _id: string;
  ref: string;
  title: string;
  customer: mongoose.Schema.Types.ObjectId;
  form: mongoose.Schema.Types.ObjectId;
  images: string[];
  description: string;
  price: number;
  isAvailable: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema: Schema = new Schema({
  ref: { type: String, required: true },
  title: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: {
    select: 'firstName lastName companyName email phone address zip city country'
  } },
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true, autopopulate: true },
  images: [{ type: String, required: true }],
  description: { type: String, required: true },
  price: { type: Number, required: true , default: 0},
  isAvailable: { type: Boolean, required: true, default: true },
  isAccepted: { type: Boolean, required: true, default: false },
  isRejected: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
});

OfferSchema.plugin(mongooseAutopopulate);

const Offer = mongoose.model<ICategoryProduct>('Offer', OfferSchema);
export default Offer;
