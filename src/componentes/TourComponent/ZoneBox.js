import React, { useState, useEffect } from "react";
import ZoneContent from "./ZoneContent";
import FetchLocalData from "../FetchLocalData";
import { useSelector } from "react-redux";
import "../TourComponent/ZoneBox.css";

const { kakao } = window;

function ZoneBox() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [tmp, setTmp] = useState(false);
  const [map, setMap] = useState(null);

  const location = useSelector((state) => state.send.value);
  //console.log(`ZonBox :${location}`);
  useEffect(() => {
    const mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    const mapinstance = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    //if (datas !== null) MapMarkers(mapinstance, datas, handleMarkerClick);
    setMap(mapinstance);
  }, []);

  useEffect(() => {
    async function fetchData() {
      let localData = await FetchLocalData({ local: location });

      if (!localData || localData.length === 0) {
        // If no data is found for the selected location, default to "서울"
        localData = await FetchLocalData({ local: "서울" });
      }
      if (localData.length > 10) {
        const newItems = Array.from({ length: 3 }, (_, index) => index + 1);
        setItems([items, ...newItems]);
      } else {
        const newItems = Array.from(
          { length: localData.length - 1 },
          (_, index) => index + 1
        );
        setItems([items, ...newItems]);
      }
      setData(localData);
      setTmp(!tmp);
      console.log("Data fetch success!");
    }
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [location]);

  useEffect(() => {
    const { kakao } = window;
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // 마커를 생성하고 지도에 표시합니다
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", //마커 이미지의 주소
      imageSize = new kakao.maps.Size(25, 34.5), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(13.5, 34.5) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    var bounds = new kakao.maps.LatLngBounds();
    if (data !== null) {
      for (let i = 0; i < items.length; i++) {
        // 마커를 생성합니다
        console.log(data[i]);
        var LatLng = new kakao.maps.LatLng(
          data[i].elements[9].elements[0].text,
          data[i].elements[8].elements[0].text
        );

        const marker = new window.kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: LatLng, // 마커의 위치
          image: markerImage, //마커 이미지 연결
        });

        bounds.extend(LatLng);

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px; font-size:12px; color:#000000; " >' +
              data[i].elements[1].elements[0].text +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      }

      map.setBounds(bounds);
    }
  }, [data]);

  return (
    <div>
      <h1 className="banner">전시 관람 후 이런 식사는 어떠세요?</h1>
      <div
        id="myMap"
        style={{
          position: "relative",
          width: "1400px",
          height: "720px",
        }}
      ></div>

      <h2 className="text">전시별 추천 음식점 TOP3</h2>
      <div>
        {data !== null && map !== null
          ? items.map((item, index) =>
              data[index] !== null ? (
                <div key={index}>
                  <ZoneContent
                    map={map}
                    area={data[index]?.elements[6]?.elements[0]?.text}
                    zoneTitle={data[index]?.elements[1]?.elements[0]?.text}
                    imageURL0={data[index]?.elements[7]?.elements[0]?.text}
                    datas={data[index]}
                  />
                </div>
              ) : null
            )
          : null}
      </div>
    </div>
  );
}

export default ZoneBox;
