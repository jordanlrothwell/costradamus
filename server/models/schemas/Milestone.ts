import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface IMilestone {
  defence?: Date;
  preHearing?: Date;
  arbitration?: Date;
}

// schema corresponding to the document interface
const MilestoneSchema = new Schema<IMilestone>(
  {
    defence: {
      type: Date,
    },
    preHearing: {
      type: Date,
    },
    arbitration: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default MilestoneSchema;
