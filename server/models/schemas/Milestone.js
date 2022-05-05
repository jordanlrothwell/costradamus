const { Schema } = require("mongoose");

// schema corresponding to the document interface
const MilestoneSchema = new Schema(
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
  { _id: false }
);

module.exports = MilestoneSchema;