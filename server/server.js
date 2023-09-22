const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
const converter = require("xml-js");
const mydb = require("./mydb");
const bodyparser = require("body-parser");

app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());
app.use(bodyparser.json());
var request = require("request");

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
app.post("/community/create", function (req, res) {
  var title = req.body.title;
  var writer = req.body.writer;
  var content = req.body.content;
  mydb
    .DBwrite(title, writer, content)
    .then(() => {
      console.log("db write success!");
      mydb.DBcount();
    })
    .catch((err) => console.log(err));
  console.log(req.body);
});

/** 커뮤니티 글 삭제하는 로직인데 id를 받아줘야함 (id가 _id 말하는것) */
app.post("/community/delete", function (req, res) {
  var id = req.body.id;
  mydb
    .DBdelete(id)
    .then(() => {
      console.log("db delete success!");
    })
    .catch((err) => console.log(err));
});

app.post("/community/update", function (req, res) {
  mydb
    .DBupdate()
    .then(() => {
      console.log("db update success!");
    })
    .catch((err) => console.log(err));
});
app.get("/community/read", function (req, res) {
  mydb
    .DBread()
    .then(() => {
      console.log("db read success!");
    })
    .catch((err) => console.log(err));
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
