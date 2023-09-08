import { useState, useEffect } from "react";
import axios from "axios";
import FetchLocalData from "../componentes/FetchLocalData";
import FetchDetailData from "../componentes/FetchDetailData";
import FetchGenreData from "../componentes/FetchGenreData";

function DataTest() {
  const [data, setData] = useState(null);

  const onSeoulClick = async () => {
    const seoul = await FetchLocalData({ local: "서울" });
    console.log("서울 클릭");
    setData(seoul);
  };

  const onBusanClick = async () => {
    const busan = await FetchLocalData({ local: "부산" });
    console.log("부산 클릭");
    setData(busan);
  };

  const onDaeguClick = async () => {
    const daegu = await FetchLocalData({ local: "대구" });
    console.log("대구 클릭");
    setData(daegu);
  };

  useState(() => {
    if (data != null) console.log(data);
    fetchData("245067");
    //fetchDataGenre("A000");
  }, [data]);

  async function fetchData(seq) {
    let fetchedData = await FetchDetailData({ seq: seq });
    console.log("seq:", seq);
    console.log(fetchedData);
  }

  async function fetchDataGenre(code) {
    let fetchedData = await FetchGenreData({ code: code });
    console.log("realmCode:", code);
    console.log("realmCode ##########################################");
    console.log(fetchedData);
  }

  return (
    <div>
      <button onClick={onSeoulClick}>서울</button>
      <button onClick={onBusanClick}>부산</button>
      <button onClick={onDaeguClick}>대구</button>
      <p></p>
      <button
        onClick={() => {
          fetchDataGenre("A000");
        }}
      >
        A000 연극
      </button>
      <button
        onClick={() => {
          fetchDataGenre("B000");
        }}
      >
        B000 음악(콘서드, 뮤직컬 등)
      </button>
      <button
        onClick={() => {
          fetchDataGenre("C000");
        }}
      >
        C000 무용
      </button>
      <button
        onClick={() => {
          fetchDataGenre("D000");
        }}
      >
        D000 미술
      </button>
      <button
        onClick={() => {
          fetchDataGenre("E000");
        }}
      >
        E000 건축
      </button>
      <button
        onClick={() => {
          fetchDataGenre("G000");
        }}
      >
        G000 영상
      </button>
    </div>
  );
}

/// 서버 안쓰고 바로 데이터 그냥 테스트 해볼때 이거 주석 해제하고 보면됨. 위에거는 주석하고
// function DataTest() {
//   const [responseData, setResponseData] = useState([]);
//   var converter = require("xml-js");

//   function fetchTitleData() {
//     axios({
//       url: "/period",
//       params: {
//         serviceKey:
//           "ciUYkNV0jGj1CGMl+VgNPpY/ajlvgVaU9KMrduD800M7/Cm461cqCDSchDZ36p4La52yMteTMyvmetcDTK8fAg==",
//       },
//       method: "GET",
//       withCredentials: true,
//     }).then((response) => {
//       var options = { ignoreComment: true, alwaysChildren: true };
//       var data = converter.xml2json(response.data, options); // or convert.xml2json(xml, options)
//       data = JSON.parse(data);
//       setResponseData(data.elements[0].elements[1]);
//       console.log(responseData);
//       // 데이터에서 title 데이터만 추출한 예시임.
//       console.log(
//         data.elements[0].elements[1].elements[3].elements[1].elements[0].text
//       );
//     });
//   }
//   useEffect(() => {
//     fetchTitleData();
//   }, []);

//   return (
//     <div>
//       <h1>Received Data:</h1>
//       {JSON.stringify(responseData)}
//     </div>
//   );
// }

export default DataTest;
