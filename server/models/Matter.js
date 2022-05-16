const { Schema, model } = require("mongoose");

// schema corresponding to the document interface
const MatterSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    quantum: {
      type: Number,
    },
    costs: {
      type: Schema.Types.ObjectId,
      ref: "Cost",
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
