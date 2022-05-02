import { Schema, model } from "mongoose";

import scaleSchema from "./schemas/Scale";
import SpecialSchema from "./schemas/Special";

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
    scale: scaleSchema,
    category: {
      type: String,
      required: true,
    },
    special: SpecialSchema,
  },
  { timestamps: true }
);

// model representing the collection in mongoDB
export const Cost = model<ICost>("Cost", CostSchema);
