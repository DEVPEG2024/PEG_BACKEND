import mongoose, { Document, Schema } from "mongoose";
import mongooseAutopopulate from "mongoose-autopopulate";
export interface IBanner extends Document {
  ref: string;
  title: string;
  customer: string | null;
  customerCategory: string | null;
  image: string | null;
  link: string | null;
  status: string;
  createdAt: Date;
}

const BannerSchema: Schema = new Schema({
  ref: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: "User", required: false, autopopulate: {
    select: "companyName firstName lastName _id"
  } },
  customerCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category_Customer",
    required: false,
    autopopulate: {
      select: "title _id"
    }
  },
  image: { type: String, required: false },
  link: { type: String, required: false },
  title: { type: String, required: false },
  status: { type: String, required: true, default: "active" },
  createdAt: { type: Date, default: Date.now },
});

BannerSchema.plugin(mongooseAutopopulate);
const Banner = mongoose.model<IBanner>("Banner", BannerSchema);
export default Banner;
