import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface IScale {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
}

// schema corresponding to the document interface
const ScaleSchema = new Schema<IScale>(
  {
    A: {
      type: Number,
    },
    B: {
      type: Number,
    },
    C: {
      type: Number,
    },
    D: {
      type: Number,
    },
    E: {
      type: Number,
    },
    F: {
      type: Number,
    },
    G: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default ScaleSchema;
