import mongoose, { Schema, Document, Types } from "mongoose";

export interface Notices extends Document {
  _id: Types.ObjectId;
  title: string;
  emp_id: string;
  emp_name: string;
  emp_position: string;
  notice_type: string;
  publish_date: Date;
  notice_body: string;
  description?: string;
  document: string;
  isDraft: boolean;
}

const noticeSchema = new Schema<Notices>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    emp_id: {
      type: String,
      required: true,
      trim: true,
    },
    emp_name: {
      type: String,
      required: true,
      trim: true,
    },
    emp_position: {
      type: String,
      required: true,
      trim: true,
    },
    notice_type: {
      type: String,
      required: true,
      trim: true,
    },
    publish_date: {
      type: Date,
      required: true,
    },
    notice_body: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    document: {
      type: String,
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model<Notices>("Notice", noticeSchema);

export default Notice;
