const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  writer: { type: String, required: true },
  comment: { type: String, required: true },
  comment_index: { type: Number },
  timestamp: { type: Date, default: Date.now },
  rating: { type: Number, default: 1 },
});

const eachSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    comments: [commentSchema],
    
  },
  {
    collection: "Comments",
  }
);

module.exports = mongoose.model("Comment", eachSchema);
