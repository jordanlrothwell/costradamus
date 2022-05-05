const { Schema } = require("mongoose");

// schema corresponding to the document interface
const ScaleSchema = new Schema(
  {
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
  },
  { _id: false }
);

module.exports = ScaleSchema;