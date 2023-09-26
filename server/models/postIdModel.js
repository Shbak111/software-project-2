const mongoose = require("mongoose");

const modelidSchema = new mongoose.Schema(
  {
    _id: { type: Number, default: 0 },
    idnumber: { type: Number, required: true, default: 0 },
  },
  {
    collection: "bids",
  }
);

module.exports = mongoose.model("BId", modelidSchema);
