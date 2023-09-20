import React, { useEffect,useState } from "react";
import MichelinCSV from "../../data/RB_MICHELIN_SLCTN_RSTRNT_INFO_20211231.csv";
import michelin from "../../assets/michelin/icon.png";
import "./DetailMap.css";

function  DetailMap({ gpsX, gpsY }) {
  const [csvData, setCsvData] = useState([]);
  const columnIndices = {
    FCLTY_NM: 1,
    FCLTY_LO: 3,
    FCLTY_LA: 4,
    HMPG_URL: 5,
  };
  
  useEffect(() => {
    const fetchAndProcessCSV = async () => {
      try {
        const response = await fetch(MichelinCSV);
        const text = await response.text();
        const lines = text.split("\n");
        const data = lines.map((line) => line.split(","));
        setCsvData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndProcessCSV();
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      const { kakao } = window;
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(gpsY, gpsX), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
      var imageSrc = michelin, // 마커이미지의 주소입니다    
          imageSize = new kakao.maps.Size(25, 34.5), // 마커이미지의 크기입니다
          imageOption = {offset: new kakao.maps.Point(13.5, 34.5)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const positions = csvData.slice(1).map((row) => ({
        content: `<div class="customoverlay">` +
                `${row[columnIndices.HMPG_URL] === '0' ? 
                  `<a onclick="alert('현재 존재하는 웹사이트가 없습니다.')" style="cursor: not-allowed;"><span class="michelin-title">${row[columnIndices.FCLTY_NM]}</span></a>` :
                  `<a href="http://${row[columnIndices.HMPG_URL]}" target="_blank"><span class="michelin-title">${row[columnIndices.FCLTY_NM]}</span></a>`}` +
                `</div>`,
        latlng: new window.kakao.maps.LatLng(
          parseFloat(row[columnIndices.FCLTY_LA]),
          parseFloat(row[columnIndices.FCLTY_LO])
        ),
      }));
      
      
      for (let i = 0; i < positions.length; i++) {
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          map: map,// 마커를 표시할 지도
          position: positions[i].latlng,// 마커의 위치
          image: markerImage, //마커 이미지 연결
        });
        // 마커에 표시할 인포윈도우를 생성합니다 
        // 커스텀 오버레이를 생성합니다
        const customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: positions[i].latlng,
          content: positions[i].content,
          yAnchor: 1 
        });
      }

      const marker = new kakao.maps.Marker({
        position: map.getCenter(),
      });
      marker.setMap(map);
    }
  }, [gpsX, gpsY,csvData]);
  return <div id="map" style={{ height: window.innerHeight, width: window.innerWidth/2 }}></div>;
}

export default DetailMap;
