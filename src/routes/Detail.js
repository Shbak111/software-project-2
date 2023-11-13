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
      </div>

      <div className="poster-info">
        <img className="poster" src={image} alt="Loading..." />
        {/* <DetailMap gpsX={gpsX} gpsY={gpsY} /> */}
      </div>

      <div className="map-info">
        <h1 className="ment">
          전시 관람후에 가보면 좋을 음식점을 소개해 드려요!!!
        </h1>
        <h3 className="ment">
          근처에 이런 음식점들이 있네요~ 방문해 봐도 좋을것 같아요!
        </h3>
        <DetailMap gpsX={gpsX} gpsY={gpsY} />
      </div>

      <div className="detail-review">
        <h1 className="ment">이 전시를 관람하셨다면 후기를 남겨주세요!!!!</h1>
        <h3 className="ment">
          여러분의 소중한 의견은 다른분들에게 도움이 된답니다!
        </h3>
        <DetailComment seq={seq} />
      </div>
    </div>
  );
}
export default Detail;
