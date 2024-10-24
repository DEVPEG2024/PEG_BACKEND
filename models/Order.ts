import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface IOrder extends Document {
  _id: string;
  customer: ObjectId;
  product: ObjectId;
  formAnswer: ObjectId,
  sizes: [
    {
      value: string;
      quantity: number
    }
  ]
  total: number;
  orderNumber: string;
  paymentStatus: string;
  status: string;
  message: string; //TODO: à compléter côté front
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  canceled: boolean;
}

const OrderSchema: Schema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true, 
    autopopulate: {
      select: "companyName firstName lastName _id"
    }
  },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, autopopulate: true},
  formAnswer: { type: Schema.Types.ObjectId, ref: 'FormAnswer', required: false,
    autopopulate: {
      select: "answers"
    }
  },
  sizes: [
    {
      value: {type: String, required: true, default: 'default'},
      quantity: { type: Number, required: true, default: 0 }
    }
  ],
  total: { type: Number, required: true, default: 0 },
  orderNumber: { type: String, required: true, default: null },
  paymentStatus: { type: String, required: true, default: 'PENDING' },
  status: { type: String, required: false, default: 'PENDING' },
  message: { type: String, required: false, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  canceled: { type: Boolean, default: false },
});

OrderSchema.plugin(mongooseAutopopulate);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
