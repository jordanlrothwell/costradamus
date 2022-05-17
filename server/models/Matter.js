const { Schema, model } = require("mongoose");

const matterSchema = new Schema({
  reference: {
    type: String,
  },
  matterAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  quantum: {
    type: Number,
  },
  costs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cost",
    },
  ],
});

const Matter = model("Matter", matterSchema);

module.exports = Matter;
