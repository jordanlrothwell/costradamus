import { Schema, model } from "mongoose";

//todo: add schemas

// interface representing a document in mongoDB
interface IMatter {
  reference: string;
  quantum: Schema;
  offers: Schema[];
  milestones: Schema[];
}

// schema corresponding to the document interface
const MatterSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    //todo: add quantum schema
    //todo: add offers schema
    //todo: add milestones schema
  },
  { timestamps: true }
);

// model representing the collection in mongoDB
export const Matter = model<IMatter>("Matter", MatterSchema);
