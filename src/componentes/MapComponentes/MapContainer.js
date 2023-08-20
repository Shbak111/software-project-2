import React, { useEffect } from "react";
import { useState } from "react";
import GetGeolocation from "./GetGeolocation";
import PlaceSearch from "./PlaceSearch";
const { kakao } = window;

function MapContainer({ keyword }) {
  console.log(keyword);

  useEffect(() => {
    PlaceSearch("myMap", keyword);
  }, [keyword]);

  useEffect(() => {
    GetGeolocation("myMap");
    console.log("getg 실행됨");
  }, []);

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
