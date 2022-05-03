import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface IQuantum {
  claimedAmount: number;
  awardedAmount: number;
}

// schema corresponding to the document interface
const QuantumSchema = new Schema<IQuantum>(
  {
    claimedAmount: {
      type: Number,
      required: true,
    },
    awardedAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default QuantumSchema;
