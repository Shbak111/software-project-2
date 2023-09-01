import React, { useEffect } from "react";
import { useState } from "react";
import GetGeolocation from "./GetGeolocation";
import PlaceSearch from "./PlaceSearch";
import { useSelector, useDispatch } from "react-redux";
const { kakao } = window;

function MapContainer({ keyword }) {
  console.log("MapContainer keyword", keyword);

  useEffect(() => {
    if (keyword !== "") {
      PlaceSearch("myMap", keyword);
      console.log("PlaceSearch 실행");
    }
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
