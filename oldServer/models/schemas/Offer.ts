import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface IOffer {
  isPlaintiff: boolean;
  amount: number;
  date: Date;
}

// schema corresponding to the document interface
const OfferSchema = new Schema<IOffer>(
  {
    isPlaintiff: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default OfferSchema;
