const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const PORT = 5000;
const converter = require("xml-js");

let dataStorage = null;

app.listen(5000, function () {
  console.log(`listening on ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());

var request = require("request");

var url =
  "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/period";
var queryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=ciUYkNV0jGj1CGMl%2BVgNPpY%2FajlvgVaU9KMrduD800M7%2FCm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg%3D%3D"; /* Service Key*/

request(
  {
    url: url + queryParams,
    method: "GET",
  },
  function (error, response, body) {
    // console.log("Status", response.statusCode);
    // console.log("Headers", JSON.stringify(response.headers));
    // console.log("Reponse received", body);

    dataStorage = converter.xml2json(body, { compact: false, spaces: 4 });

    console.log(dataStorage);
  }
);

app.get("/api/data", function (req, res) {
  if (dataStorage) {
    res.json(JSON.parse(dataStorage));
  } else {
    res.json({ massage: "API call error" });
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
