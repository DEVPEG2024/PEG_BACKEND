import mongoose, { Document, Schema } from 'mongoose';


export interface IMail extends Document {
  name: string;
  label: string;
  group: string;
  flagged: boolean;
  starred: boolean;
  from: string;
  to: string;
  title: string;
  status: string;
  createdAt: Date;
  startDate: Date;
  messages: IMessage[];
}

export interface IMessage extends Document {
  user: string;
  content: string;
  date: Date;
  attachments: IAttachment[];
}

export interface IAttachment extends Document {
  file: string;
  size: string;
  type: string;
}

const AttachmentSchema: Schema = new Schema({
    file: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
});

const MessageSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    attachments: { type: [AttachmentSchema], required: true },
});

const MailSchema: Schema = new Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    group: { type: String, required: true },
    flagged: { type: Boolean, required: true },
    starred: { type: Boolean, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    messages: { type: [MessageSchema], required: true },
});


const Mail = mongoose.model<IMail>('Mail', MailSchema);
export default Mail;
