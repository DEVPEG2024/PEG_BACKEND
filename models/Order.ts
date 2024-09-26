import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export interface IOrder extends Document {
  _id: string;
  customer: string;
  products: [
    {
      product: string,
      quantity: number,
      promoPrice: number,
      price: number,
      total: number,
      available: boolean,
      replaced: boolean,
      replacedProduct: string,
      _id: string,
    }
  ];
  orderNumber: string;
  storeId: string;
  subtotal: number;
  discount: number;
  promoPrice: number;
  vat: number;
  total: number;
  coupon: string;
  pickup: boolean;
  pickupDate: Date;
  paymentMethod: string;
  qrCode: string;
  status: string;
  pickupOrderAt: Date;
  pickupOrderTimeAt: string;
  paymentIntentId: string;
  substitution: boolean;
  inPark: boolean;
  bags: boolean;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  refunded: boolean;
  amountRefunded: number;
  deletedAt: Date | null;
  canceled: boolean;
}

const OrderSchema: Schema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: false,  autopopulate: true },
  orderNumber: { type: String, required: false, default: null },
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: false,  autopopulate: true},
  inPark: { type: Boolean, required: false, default: false },
  promoPrice: { type: Number, required: false, default: 0 },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: false, autopopulate: true },
    quantity: { type: Number, required: false, default: 0 },
    price: { type: Number, required: false, default: 0 },
    total: { type: Number, required: false, default: 0 },
    available: { type: Boolean, required: false, default: false },
    replaced: { type: Boolean, required: false, default: false },
    replacedProduct: { type: Schema.Types.ObjectId, ref: 'Product', required: false, autopopulate: true, default: null },
  }],
  subtotal: { type: Number, required: false, default: 0 },
  discount: { type: Number, required: false, default: 0 },
  vat: { type: Number, required: false, default: 0 },
  total: { type: Number, required: false, default: 0 },
  coupon: { type: String, required: false, default: null },
  pickup: { type: Boolean, required: false, default: false },
  pickupDate: { type: Date, required: false, default: null },
  pickupTime: { type: String, required: false, default: null },
  pickupOrderAt: { type: Date, required: false, default: null },
  paymentMethod: { type: String, required: false, default: null },
  qrCode: { type: String, required: false, default: null },
  status: { type: String, required: false, default: 'En attente' },
  substitution: { type: Boolean, required: false, default: false },
  bags: { type: Boolean, required: false, default: false },
  message: { type: String, required: false, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  canceled: { type: Boolean, default: false },
  refunded: { type: Boolean, default: false },
  amountRefunded: { type: Number, default: 0 },
  paymentIntentId: { type: String, required: false, default: null },
});

OrderSchema.plugin(mongooseAutopopulate);

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
