import { Schema } from "mongoose";

// interface representing a document in mongoDB
interface IMilestone {
  defence?: Date;
  preHearing?: Date;
  arbitration?: Date;
}

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
