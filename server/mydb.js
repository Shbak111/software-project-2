const db = require("mongodb");
const mongoose = require("mongoose");
const Board = require("./models/postModel");
const BId = require("./models/postIdModel");
const uri =
  "mongodb+srv://khbak111:oolLK4Yj8rK1JFNh@cluster0.td4kmi4.mongodb.net/mydb?retryWrites=true&w=majority";

function ConnectDB() {
  mongoose.connect(uri).then(() => console.log("db connect success!"));
}

async function writeOnDB(title, writer, content) {
  var count = await counter();
  const board = new Board({
    _id: count,
    title: title,
    content: content,
    writer: writer,
  });
  board.save();
}

async function deleteOnDB(id) {
  await Board.deleteOne({ _id: id });
}

async function updateOnDB() {}

async function readOnDB() {
  await Board.find().then((data) => console.log("Boards: ", data));
}

async function countOnDB() {
  const count = await Board.estimatedDocumentCount();
  console.log("there are %d boards", count);
}

async function counter() {
  const data = await BId.find({ _id: 0 });

  const count = data[0].idnumber;
  console.log(count);

  await BId.updateOne({ _id: 0 }, { $set: { idnumber: count + 1 } });

  return count;
}

async function testonDB() {}

module.exports.DBconnection = ConnectDB;
module.exports.DBwrite = writeOnDB;
module.exports.DBcount = countOnDB;
module.exports.DBdelete = deleteOnDB;
module.exports.DBupdate = updateOnDB;
module.exports.DBread = readOnDB;
module.exports.DBtest = testonDB;
