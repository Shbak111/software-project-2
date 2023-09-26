const db = require("mongodb");
const mongoose = require("mongoose");
const Board = require("./models/postModel");
const BId = require("./models/postIdModel");
const uri =
  "mongodb+srv://khbak111:oolLK4Yj8rK1JFNh@cluster0.td4kmi4.mongodb.net/mydb?retryWrites=true&w=majority";

/** DB 연결 함수 */
function ConnectDB() {
  mongoose.connect(uri).then(() => console.log("db connect success!"));
}

/** DB에 커뮤니티 글 작성하는 함수 */
async function writeOnDB(title, writer, content,timestamp) {
  var count = await counter();
  const board = new Board({
    _id: count,
    title: title,
    content: content,
    writer: writer,
    timestamp : timestamp,
  });
  board.save();
}

/** 커뮤니티에 글 삭제하는 함수 */
async function deleteOnDB(id) {
  await Board.deleteOne({ _id: id });
}

/** 커뮤니티에 글 수정하는 함수 */
async function updateOnDB() {}

/** DB로 부터 모든 커뮤니티글을 읽어옴. Boards collection으로 부터 */
async function readOnDB() {
  await Board.find().then((data) => console.log("Boards: ", data));
}
/** DB로 부터 Boards collection에 즉, 글이 몇개있는지 읽어옴 */
async function countOnDB() {
  const count = await Board.estimatedDocumentCount();
  console.log("there are %d boards", count);
}

/** id unique화 하려고 id 자동으로 1식올려주는 함수 */
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
