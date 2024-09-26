import mongoose, { Document, Schema } from 'mongoose';


export interface ITask extends Document {
  project: string;
  createdBy: string;
  forUser: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
}


const TaskSchema: Schema = new Schema({
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    forUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});


const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
