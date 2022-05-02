import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface ISpecial {
  rate: number;
  amount?: number;
}

// schema corresponding to the document interface
const SpecialSchema = new Schema<ISpecial>(
  {
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default SpecialSchema;
