const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    content: { type: String, required: true },
    writer: { type: String, required: true },
  },
  {
    collection: "Boards",
  }
);

module.exports = mongoose.model("Board", boardSchema);
