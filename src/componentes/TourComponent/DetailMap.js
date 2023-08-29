import React, { useEffect } from "react";

function  DetailMap({ gpsX, gpsY }) {
  useEffect(() => {
    const { kakao } = window;
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(gpsY, gpsX),
      level: 7,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // Display a marker at the provided coordinates
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    marker.setMap(map);
  }, [gpsX, gpsY]);

  return <div id="map" style={{ height: window.innerHeight/2, width: window.innerWidth }}></div>;
}

export default DetailMap;
