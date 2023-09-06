import React from "react";
import "../css/Detail.css";
import ImageGrid from "../componentes/TourComponent/ImageGrid";
import logo from "../assets/logo.png"
import DetailMap from "../componentes/TourComponent/DetailMap";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();

  const { title, realmName, image, place, area, gpsX, gpsY } = location.state || {};
  
  const images = [
    { url : image },
    { url : image },
    { url : image },
    { url : image }
  ];
  const url = "https://tickets.interpark.com/goods/23008837";


    return (
      <div className="detail-container">
        {title}
        <ImageGrid images={images}/>
        <div className="detail-info">
          <h1>상세정보</h1>
          <p className="area">{area}</p>
          <p className="place">{place}</p>
          <p className="realmName">{realmName}</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
          <button className="book-button"> 사이트 이동 </button>
          </a>
        </div>
        <div className="detail-description">
          <p>
            공연설명
          </p>
          <DetailMap gpsX={gpsX} gpsY={gpsY} />
        </div>

      </div>
      );
  }
  export default Detail;
  
