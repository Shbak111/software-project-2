import { useState, useEffect } from "react";
import axios from "axios";
import FetchLocalData from "../componentes/FetchLocalData";

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
  }, [data]);

  return (
    <div>
      <button onClick={onSeoulClick}>서울</button>
      <button onClick={onBusanClick}>부산</button>
      <button onClick={onDaeguClick}>대구</button>
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
