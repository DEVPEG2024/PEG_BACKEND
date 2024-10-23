import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { IOrder } from './Order';

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  comment: string;
  user: string;
  file: string;
  fileType: string;
  createdAt: Date;
}

export interface IFile extends Document {
  _id: mongoose.Types.ObjectId;
  file: string;
  fileType: string;
  createdAt: Date;
}

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

export interface IProject extends Document {
  _id: string;
  ref : string;
  title: string;
  description: string;
  fullDescription: string;
  startDate: Date;
  endDate: Date;
  status: string;
  customer: string;
  producer: string;
  amount: number;
  amountProducers: number;
  amountPaid: number;
  amountRemaining: number;
  priority: string;
  progress: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: Date;
  comments: IComment[];
  files: IFile[];
  tasks: ITask[];
  order: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  deleted: boolean;
}

const FileSchema: Schema = new Schema({
  file: { type: String, required: false },
  fileType: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema: Schema = new Schema({
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true , autopopulate: true},
  file: { type: String, required: false },
  fileType: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const TasksSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, required: true, default: 'Pending' },
  priority: { type: String, required: true, default: 'low' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false },
});


const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  ref: { type: String, required: true },
  description: { type: String, required: false },
  fullDescription: { type: String, required: false },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: true },
  producer: { type: Schema.Types.ObjectId, ref: 'User', required: false, autopopulate: true },
  amount: { type: Number, required: true, default: 0 },
  progress: { type: Number, required: true, default: 0 },
  amountPaid: { type: Number, required: true, default: 0 },
  amountRemaining: { type: Number, required: true, default: 0 },
  paymentMethod: { type: String, required: true, default: 'Bank Transfer' },
  priority: { type: String, required: true, default: 'low' },
  paymentStatus: { type: String, required: true, default: 'Pending' },
  paymentDate: { type: Date, required: true, default: Date.now },
  amountProducers: { type: Number, required: true, default: 0 },
  comments: [CommentSchema],
  files: [FileSchema],
  tasks: [TasksSchema],
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: false, autopopulate: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false },
});

ProjectSchema.plugin(autopopulate);
const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;
