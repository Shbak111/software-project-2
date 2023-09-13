const db = require("mongodb");
const mongoose = require("mongoose");
const Board = require("./models/postModel");

const uri =
  "mongodb+srv://khbak111:oolLK4Yj8rK1JFNh@cluster0.td4kmi4.mongodb.net/mydb?retryWrites=true&w=majority";

function ConnectDB() {
  mongoose.connect(uri).then(() => console.log("db connect success!"));
}

const board = new Board({
  _id: 1,
  title: "test",
  content: "content",
});

async function writeOnDB() {
  await board.save();
}

module.exports.DBconnection = ConnectDB;
module.exports.DBwrite = writeOnDB;
