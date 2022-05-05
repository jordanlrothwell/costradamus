const { Schema } = require("mongoose");

// schema corresponding to the document interface
const QuantumSchema = new Schema(
  {
    claimedAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    awardedAmount: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = QuantumSchema;