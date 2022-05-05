const { Schema, model } = require("mongoose");

// import schemas
const QuantumSchema = require("./schemas/Quantum");
const OfferSchema = require("./schemas/Offer");

// schema corresponding to the document interface
const MatterSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    quantum: {
      claimedAmount: {
        type: Number,
        required: true,
      },
      awardedAmount: {
        type: Number,
        required: true,
      },
    },
    offer: {
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
    milestones: {
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
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// model representing the collection in mongoDB
const Matter = model("Matter", MatterSchema);

module.exports = Matter;
