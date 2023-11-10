const db = require("mongodb");
const mongoose = require("mongoose");
const Board = require("./models/postModel");
const BId = require("./models/postIdModel");
const Comment = require("./models/commentModel");
const uri =
  "mongodb+srv://khbak111:oolLK4Yj8rK1JFNh@cluster0.td4kmi4.mongodb.net/mydb?retryWrites=true&w=majority";

/** DB 연결 함수 */
function ConnectDB() {
  mongoose.connect(uri).then(() => console.log("db connect success!"));
}

/** DB에 커뮤니티 글 작성하는 함수 */
async function writeOnDB(title, writer, content, timestamp) {
  var count = await counter();
  const board = new Board({
    _id: count,
    title: title,
    content: content,
    writer: writer,
    timestamp: timestamp,
    views: 0,
    comments: [],
  });
  board.save();
}

/** 공연,전시 리뷰 저장을 위한 댓글 작성 함수 */
async function EachcommentWriteDB(index) {
  const comment = new Comment({
    _id: index,
    comments: [],
    rating:rating,
  });
  comment.save();
}

/** 커뮤니티에 글 삭제하는 함수 */
async function deleteOnDB(index) {
  // 인덱스 즉, 게시글의 _id를 기준으로 찾아와서 삭제함
  await Board.deleteOne({ _id: index });
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
let comment_count = 0;
/** 댓글 추가하는 로직. 해당 게시글의 index를 알고 그 게시글에 접근해서 comment 추가 */
async function commentWrite(index, writer, comment, model) {
  // 필터를 설정하여 해당 데이터를 찾습니다.
  const filter = { _id: index };

  // 업데이트할 데이터를 설정합니다.
  const update = {
    $push: {
      comments: {
        writer: writer,
        comment: comment,
        comment_index: comment_count,
      },
    },
  };

  // 옵션을 설정하여 데이터가 없을 경우 새로 생성하도록 합니다.
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // findOneAndUpdate를 사용하여 데이터를 업데이트 또는 생성합니다.
  const result = await model.findOneAndUpdate(filter, update, options);

  comment_count++;
}

async function testonDB() {}

module.exports.DBconnection = ConnectDB;
module.exports.DBwrite = writeOnDB;
module.exports.DBcount = countOnDB;
module.exports.DBboardDelete = deleteOnDB;
module.exports.DBupdate = updateOnDB;
module.exports.DBread = readOnDB;
module.exports.DBtest = testonDB;
module.exports.DBcomment = commentWrite;
module.exports.DBeachComment = EachcommentWriteDB;
