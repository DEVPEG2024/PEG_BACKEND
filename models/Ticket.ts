import mongoose, { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

export interface ITicket extends Document {
  ref: string;
  user: string;
  team: string | null;
  type: string;
  title: string;
  description: string;
  file: string;
  status: string;
  priority: string;
  createdAt: Date;
}


const TicketSchema: Schema = new Schema({
    ref: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: {
      select: '_id firstName lastName email companyName'
    } },
    team: { type: Schema.Types.ObjectId, ref: 'User', required: false, autopopulate: {
      select: '_id firstName lastName email companyName'
    } },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: false },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

TicketSchema.plugin(autopopulate);

const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);
export default Ticket;
