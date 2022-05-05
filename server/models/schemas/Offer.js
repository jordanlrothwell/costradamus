const { Schema } = require("mongoose");

// schema corresponding to the document interface
const OfferSchema = new Schema(
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
  { _id: false }
);

module.exports = OfferSchema;