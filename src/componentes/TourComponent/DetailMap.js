import React, { useEffect } from "react";

function  DetailMap({ gpsX, gpsY }) {
  useEffect(() => {
    const { kakao } = window;
    console.log(gpsX)
    console.log(gpsY)
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(gpsY, gpsX), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    // Display a marker at the provided coordinates
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);
  }, [gpsX, gpsY]);
  return <div id="map" style={{ height: window.innerHeight, width: window.innerWidth/2 }}></div>;
}

export default DetailMap;
