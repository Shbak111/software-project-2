import React, { useEffect } from "react";
import { useState } from "react";
import GetGeolocation from "./GetGeolocation";
import PlaceSearch from "./PlaceSearch";
import MapMarkers from "./MapMarkers";
import { useDispatch } from "react-redux";
import { markerdata } from "../../reducers/markerData";
import { mdetailtmp } from "../../reducers/markerdetailState";
const { kakao } = window;

function MapContainer({ keyword, datas }) {
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  function handleMarkerClick(data) {
    console.log(data);
    dispatch(markerdata(data)); // 클릭 이벤트에서 데이터를 Redux로 전달
    dispatch2(mdetailtmp(true));
    console.log("마커 데이터 저장 완료");
  }

  useEffect(() => {
    var mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    console.log("MapContainer keyword", keyword);
    console.log("MapContainer data", datas);

    if (keyword !== "") {
      PlaceSearch(map, keyword);
      console.log("PlaceSearch 실행");
    }

    GetGeolocation(map);
    console.log("getg 실행됨");

    MapMarkers(map, datas, handleMarkerClick);
    console.log("MapMarker 실행됨");
  }, [keyword]);

  return (
    <div
      id="myMap"
      style={{
        position: "relative",
        height: window.innerHeight,
        width: window.innerWidth,
      }}
    ></div>
  );
}

export default MapContainer;
