import { Schema, model } from "mongoose";

// import schemas
import QuantumSchema from "./schemas/Quantum";
import OfferSchema from "./schemas/Offer";
import MilestoneSchema from "./schemas/Milestone";

// interface representing a document in mongoDB
interface IMatter {
  reference: string;
  quantum: Schema;
  offers: Schema;
  milestones: Schema;
}

// schema corresponding to the document interface
const MatterSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    quantum: QuantumSchema,
    offers: OfferSchema,
    milestones: MilestoneSchema,
  },
  { timestamps: true }
);

// model representing the collection in mongoDB
export const Matter = model<IMatter>("Matter", MatterSchema);
