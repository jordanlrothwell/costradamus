const { Schema, model } = require("mongoose");

// import schemas
const QuantumSchema = require("./schemas/Quantum");
const OfferSchema = require("./schemas/Offer");
const MilestoneSchema = require("./schemas/Milestone");

// schema corresponding to the document interface
const MatterSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    quantum: QuantumSchema,
    offer: OfferSchema,
    milestones: MilestoneSchema,
    matterUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
