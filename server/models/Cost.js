const mongoose = require("mongoose");

const { Schema } = mongoose;

const scaleSchema = new Schema({
  A: {
    type: Number,
  },
  B: {
    type: Number,
  },
  C: {
    type: Number,
  },
  D: {
    type: Number,
  },
  E: {
    type: Number,
  },
  F: {
    type: Number,
  },
  G: {
    type: Number,
  },
});

const costSchema = new Schema({
  itemNumber: {
    type: Number,
  },
  description: {
    type: String,
  },
  scale: scaleSchema,
});

const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
