import axios from "axios";

/** server.js 에서 받은 데이터를 클라이언트사이드에서 불러오는 함수임. 이거 쓰면 데이터 서버로부터 받아와짐
 * + 이거는 Date 기준으로 받아온 데이터임 startDate, endDate 기준 현재는 startDate 이거는 server.js 수정으로 원하는 데이터
 * 받아오는걸로 변경가능 queryParams에 추가하면 됨.
 */
async function FetchMyData() {
  try {
    const response = await axios({
      url: "/api/data",
      method: "GET",
      withCredentials: true,
    });
    // 기본적으로 데이터에서 body부분 유효 정보만 있는 부분만 떼어냄.
    const filteredData = response.data;
    const filteredData2 = filteredData.elements[0].elements[1].elements;
    const filteredData3 = [...filteredData2];

    // 데이터 최종 필터링. 원하는 perforList 항목만 걸러냄
    let finaldata = [];
    filteredData3.map((item, index) => {
      if (item.name == "perforList") {
        finaldata.push(item);
      }
    });
    finaldata.map((item, index) => {
      //console.log(item);
    });

    return finaldata;
  } catch {
    console.error("Error fetching data:");
    return null;
  }
}

export default FetchMyData;
