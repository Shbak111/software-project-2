const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
const converter = require("xml-js");

let fromDataStorage = null;
let localDataStorage = null;

app.listen(5000, function () {
  console.log(`listening on ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());

var request = require("request");

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

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
