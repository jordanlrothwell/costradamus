const { Schema } = require("mongoose");

// schema corresponding to the document interface
const SpecialSchema = new Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = SpecialSchema;
