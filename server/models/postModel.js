const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  writer: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const boardSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    content: { type: String, required: true },
    writer: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  {
    collection: "Boards",
  }
);

module.exports = mongoose.model("Board", boardSchema);
