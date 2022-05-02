import { Schema, model } from "mongoose";

// interface representing a document in mongoDB
interface ICost {
  itemNumber: number;
  description: string;
  scale: Schema;
  category: string;
  special?: Schema;
}

// schema corresponding to the document interface
const CostSchema = new Schema(
  {
    itemNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // TODO: add sub-schema for scale
    category: {
      type: String,
      required: true,
    },
    // TODO: add sub-schema for special
  },
  { timestamps: true }
);

// model representing the collection in mongoDB
export const Cost = model<ICost>("Cost", CostSchema);
