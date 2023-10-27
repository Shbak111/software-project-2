import React from "react";
import "../css/Detail.css";
import DetailMap from "../componentes/TourComponent/DetailMap";
import DetailComment from "../componentes/TourComponent/DetailComment";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();

  const { seq, title, realmName, image, place, area, gpsX, gpsY } =
    location.state || {};

  // const images = [
  //   { url : image },
  //   { url : logo },
  //   { url : logo },
  //   { url : logo }
  // ];

  return (
    <div className="detail-container">
      <div className="detail-info">
        <text className="area">{area}</text>
        <text className="place">,{place}</text>
        <h1 className="title">{title}</h1>
        <p className="realmName">{realmName}</p>
        <img className="poster" src={image} alt="Loading..." />
      </div>
      <div className="detail-info">
        {/* <DetailMap gpsX={gpsX} gpsY={gpsY} /> */}
        <DetailMap gpsX={gpsX} gpsY={gpsY} />
        <div style={{ marginTop: 30, flex: 1 }}>
          <DetailComment seq={seq} />
        </div>
      </div>
    </div>
  );
}
export default Detail;
