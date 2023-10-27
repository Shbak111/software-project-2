const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
const converter = require("xml-js");
const mydb = require("./mydb");
const Board = require("./models/postModel");
const Comment = require("./models/commentModel");
const User = require("./models/userModel");
const bodyparser = require("body-parser");
const request = require("request");

app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());
app.use(bodyparser.json());

let fromDataStorage = null;
let localDataStorage = null;
let detailDataStorage = null;
let realmCodeDataStorage = null;

app.listen(5000, function () {
  console.log(`listening on ${PORT}`);
});

///db//////////////////////////////////////////////////////////////////

mydb.DBconnection();

/** 여기가 커뮤니티 글 받는 서버 로직 */
app.post("/community/create", async function (req, res) {
  var title = req.body.title;
  var writer = req.body.writer;
  var content = req.body.content;
  var timestamp = new Date();
  await mydb
    .DBwrite(title, writer, content, timestamp)
    .then(() => {
      console.log("db write success!");
      mydb.DBcount();
    })
    .catch((err) => console.log(err));
  //console.log(req.body);
  return res.redirect("/Community");
});

app.post("/community/update", function (req, res) {
  mydb
    .DBupdate()
    .then(() => {
      console.log("db update success!");
    })
    .catch((err) => console.log(err));
});

app.get("/community/read", async function (req, res) {
  const boards = await Board.find().exec();
  //console.log(boards);
  res.json(boards);
});

app.get("/community/postByIndex/:index", async function (req, res) {
  const { index } = req.params; // 클라이언트에서 전달된 인덱스
  try {
    // 데이터베이스에서 해당 인덱스의 게시글 데이터 조회
    const post = await Board.findOne({ _id: index }).exec();

    if (post) {
      post.views += 1;
      post.save();
      // 게시글 데이터가 존재하는 경우 클라이언트에 응답으로 반환
      res.json(post);
    } else {
      // 해당 인덱스의 게시글을 찾을 수 없는 경우 에러 응답
      res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
  } catch (error) {
    // 조회 중 에러가 발생한 경우 에러 응답
    console.error("게시글 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

/** 커뮤니티 말고 전시,공연 리뷰 댓글 읽어오기 */
app.get("/tour/readcomments/:index", async function (req, res) {
  const { index } = req.params; // 클라이언트에서 전달된 인덱스
  try {
    // 데이터베이스에서 해당 인덱스의 게시글 데이터 조회
    const post = await Comment.findOne({ _id: index }).exec();

    if (post) {
      // 게시글 데이터가 존재하는 경우 클라이언트에 응답으로 반환
      res.json(post);
    } else {
      // 해당 인덱스의 게시글을 찾을 수 없는 경우 에러 응답
      res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
  } catch (error) {
    // 조회 중 에러가 발생한 경우 에러 응답
    console.error("게시글 조회 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

app.put("/community/updatePost/:index", async (req, res) => {
  const { index } = req.params;
  const updatedData = req.body;
  try {
    const post = await Board.findOne({ _id: index }).exec();
    if (post) {
      post.title = updatedData.title;
      post.content = updatedData.content;
      await post.save();
      res.json({ message: "게시글이 업데이트되었습니다." });
    } else {
      res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("게시글 업데이트 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

/** index, 코멘트 내용, 작성자 받아서 코멘트 추가하는 로직 */
app.post("/community/postComment", async function (req, res) {
  let { index } = req.body; // 클라이언트에서 전달된 인덱스
  let { comment } = req.body;
  let { writer } = req.body;
  let { model } = req.body;
  //let { comment_index } = req.body;
  console.log(model);
  try {
    // 일반 커뮤니티에서 댓글 달 경우 Board로 연결
    if (model === "Board") mydb.DBcomment(index, writer, comment, Board);
    // 커뮤니티가 아니고 전시, 공연 쪽에서 리뷰 댓글 달 경우 Comment로 연결
    else if (model === "Comment") {
      if (Comment.findOne({ _id: index })) {
        mydb.DBcomment(index, writer, comment, Comment);
      } else {
        mydb.DBeachComment(index).then(() => {
          mydb.DBcomment(index, writer, comment, Comment);
        });
      }
    }
    return res.send({ message: "add comment success!" });
  } catch (error) {
    // 댓글 작성 중 에러가 발생한 경우 에러 응답
    console.error("댓글 작성 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

app.post("/api/deleteComment", async (req, res) => {
  const { index, comment_index, model } = req.body; // 클라이언트에서 게시물 인덱스와 댓글 인덱스를 보내는 것을 가정합니다.

  try {
    // 인덱스를 기반으로 게시물을 찾습니다.
    let post;
    if (model === "Board") {
      post = await Board.findOne({ _id: index }).exec();
    } else if (model === "Comment") {
      post = await Comment.findOne({ _id: index }).exec();
    }
    if (post) {
      // 댓글 배열에서 댓글을 찾아서 제거합니다.
      const comment = post.comments.find(
        (c) => c.comment_index === comment_index
      );
      if (comment) {
        post.comments.pull(comment);
        await post.save();
        res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다" });
      } else {
        res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
      }
    } else {
      res.status(404).json({ error: "게시물을 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 서버에서 댓글 수정을 처리하는 엔드포인트 추가
app.post("/api/editComment", async (req, res) => {
  const { index, comment_index, editedComment, model } = req.body; // 클라이언트에서 게시물 인덱스, 댓글 인덱스 및 수정된 댓글 내용을 받음

  try {
    // 게시물을 찾고 댓글을 수정합니다.
    let post;
    if (model === "Board") {
      post = await Board.findOne({ _id: index }).exec();
    } else if (model === "Comment") {
      post = await Comment.findOne({ _id: index }).exec();
    }
    if (post) {
      const comment = post.comments.find(
        (c) => c.comment_index === comment_index
      );
      if (comment) {
        comment.comment = editedComment;
        await post.save();
        res.status(200).json({ message: "댓글이 성공적으로 수정되었습니다" });
      } else {
        res.status(404).json({ error: "댓글을 찾을 수 없습니다" });
      }
    } else {
      res.status(404).json({ error: "게시물을 찾을 수 없습니다" });
    }
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

/** 글 삭제하는 로직 */
app.post("/community/removeBoard", async function (req, res) {
  let { index } = req.body; // 클라이언트에서 전달된 인덱스

  try {
    await mydb.DBboardDelete(index).then(() => {
      console.log("delete success");
    });
    return res.redirect("/Community");
  } catch (error) {
    // 댓글 작성 중 에러가 발생한 경우 에러 응답
    console.error("댓글 작성 중 오류 발생:", error);
    res.status(500).json({ error: "서버 오류" });
  }
});

/** 사용자 회원가입 */
app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something went wrong", e);
  }
});
/** 사용자 로그인 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 사용자 이메일 찾기
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      // Authentication failed
      res.status(401).json({ authenticated: false });
    } else {
      // Authentication successful
      res.json({ authenticated: true, nickname: user.nickname });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//mydb.DBread();
////db/////////////////////////////////////////////////////////////////////

/** 날짜 기반 데이터 콜 할때 쓰는 queryparams */
var dateQueryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=ciUYkNV0jGj1CGMl%2BVgNPpY%2FajlvgVaU9KMrduD800M7%2FCm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg%3D%3D";

/** 지역 기반 데이터 콜 할때 쓰는 queryparams */
var localQueryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=ciUYkNV0jGj1CGMl%2BVgNPpY%2FajlvgVaU9KMrduD800M7%2FCm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg%3D%3D";

/** 전시/공연데이터 상세정보조회용 queryparams */
var seqQueryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=ciUYkNV0jGj1CGMl%2BVgNPpY%2FajlvgVaU9KMrduD800M7%2FCm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg%3D%3D";

/** 분야별 데이터 상세정보조회용 queryparams */
var codeQueryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=ciUYkNV0jGj1CGMl%2BVgNPpY%2FajlvgVaU9KMrduD800M7%2FCm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg%3D%3D";

/** 날짜기반 데이터 콜 api */
app.get("/api/fromdata", function (req, res) {
  var url =
    "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period";
  let fromQuery =
    "&" + encodeURIComponent("from") + "=" + encodeURIComponent("20230101");

  request(
    {
      url: url + dateQueryParams + fromQuery,
      method: "GET",
    },
    function (error, response, body) {
      fromDataStorage = converter.xml2json(body, { compact: false, spaces: 4 });

      //console.log(fromDataStorage);

      if (fromDataStorage !== null) {
        res.json(JSON.parse(fromDataStorage));
      } else {
        res.json({ massage: "API call error" });
      }
    }
  );
});

/** 지역 기반 데이터 콜 api */
app.get("/api/localdata/:local", function (req, res) {
  let local = req.params.local;
  console.log(local);
  var url =
    "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/area";
  let localQuery =
    "&" + encodeURIComponent("sido") + "=" + encodeURIComponent(local);
  localQuery +=
    "&" + encodeURIComponent("rows") + "=" + encodeURIComponent("100");

  request(
    {
      url: url + localQueryParams + localQuery,
      method: "GET",
    },
    function (error, response, body) {
      localDataStorage = converter.xml2json(body, {
        compact: false,
        spaces: 4,
      });

      //console.log(localDataStorage);

      if (localDataStorage !== null) {
        res.json(JSON.parse(localDataStorage));
      } else {
        res.json({ massage: "API call error" });
      }
    }
  );
});

/** 공연/전시 상세정보 조회 (seq 기반) */
app.get("/api/detailData/:seq", function (req, res) {
  let seq = req.params.seq;
  console.log(seq);
  var url =
    "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/";

  let seqQuery =
    "&" +
    encodeURIComponent("ComMsgHeader") +
    "=" +
    encodeURIComponent(""); /* */
  seqQuery +=
    "&" +
    encodeURIComponent("CallBackURI") +
    "=" +
    encodeURIComponent(""); /* */
  // seqQuery +=
  //   "&" + encodeURIComponent("MsgBody") + "=" + encodeURIComponent(""); /* */
  seqQuery += "&" + encodeURIComponent("seq") + "=" + encodeURIComponent(seq);

  request(
    {
      url: url + seqQueryParams + seqQuery,
      method: "GET",
    },
    function (error, response, body) {
      detailDataStorage = converter.xml2json(body, {
        compact: false,
        spaces: 4,
      });

      //console.log(localDataStorage);

      if (detailDataStorage !== null) {
        res.json(JSON.parse(detailDataStorage));
      } else {
        res.json({ massage: "API call error" });
      }
    }
  );
});

/** 분야별 전시 상세정보 조회 (realmCode 기반) */
app.get("/api/realmCode/:code", function (req, res) {
  let code = req.params.code;
  console.log(code);
  var url =
    "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm";

  let codeQuery =
    "&" + encodeURIComponent("realmCode") + "=" + encodeURIComponent(code);
  codeQuery +=
    "&" +
    encodeURIComponent("from") +
    "=" +
    encodeURIComponent("20230101"); /* */
  codeQuery +=
    "&" + encodeURIComponent("to") + "=" + encodeURIComponent("20231201"); /* */
  codeQuery +=
    "&" + encodeURIComponent("rows") + "=" + encodeURIComponent("100"); /* */
  request(
    {
      url: url + codeQueryParams + codeQuery,
      method: "GET",
    },
    function (error, response, body) {
      realmCodeDataStorage = converter.xml2json(body, {
        compact: false,
        spaces: 4,
      });

      if (realmCodeDataStorage !== null) {
        res.json(JSON.parse(realmCodeDataStorage));
      } else {
        res.json({ massage: "API call error" });
      }
    }
  );
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
