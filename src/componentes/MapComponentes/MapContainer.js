import React, { useEffect } from "react";
import { useState } from "react";
import GetGeolocation from "./GetGeolocation";
import PlaceSearch from "./PlaceSearch";
import MapMarkers from "./MapMarkers";
const { kakao } = window;

function MapContainer({ keyword, datas }) {
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

    MapMarkers(map, datas);
    console.log("MapMarker 실행됨");
  }, [keyword]);

  return (
    <div
      id="myMap"
      style={{
        height: window.innerHeight,
        width: window.innerWidth,
      }}
    ></div>
  );
}

export default MapContainer;
