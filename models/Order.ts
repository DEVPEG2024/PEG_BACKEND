import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface IOrder extends Document {
  _id: string;
  customer: ObjectId;
  product: ObjectId;
  formAnswerId: ObjectId,
  sizes: [
    {
      value: string;
      quantity: number
    }
  ]
  total: number;
  orderNumber: string;
  paymentMethod: string;
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
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true,
    autopopulate: {
      select: "title _id"
    }
  },
  formAnswerId: { type: Schema.Types.ObjectId, ref: 'FormAnswer', required: true},
  sizes: [
    {
      value: {type: String, required: true, default: 'default'},
      quantity: { type: Number, required: true, default: 0 }
    }
  ],
  total: { type: Number, required: true, default: 0 },
  orderNumber: { type: String, required: true, default: null },
  paymentMethod: { type: String, required: false, default: null },
  status: { type: String, required: false, default: 'pending' },
  message: { type: String, required: false, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  canceled: { type: Boolean, default: false },
});

OrderSchema.plugin(mongooseAutopopulate);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
