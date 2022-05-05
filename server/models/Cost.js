const { Schema, model } = require("mongoose");

// import schemas
const scaleSchema = require("./schemas/Scale");
const SpecialSchema = require("./schemas/Special");

// schema corresponding to the document interface
const CostSchema = new Schema(
  {
    itemNumber: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scale: scaleSchema,
    category: {
      type: String,
      required: true,
    },
    special: SpecialSchema,
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// model representing the collection in mongoDB
const Cost = model("Cost", CostSchema);

module.exports = Cost;
