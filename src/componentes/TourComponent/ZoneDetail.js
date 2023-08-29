import React from "react";
import "./Detail.css";
import ImageGrid from "./ImageGrid";
import logo from "../../assets/logo.png";
import DetailMap from "./DetailMap"; // Make sure to use the correct import path

function ZoneDetail({ zoneIndex }) {
  const images = [
    { url: logo },
    { url: logo },
    { url: logo },
    { url: logo },
  ];
  const url = "https://tickets.interpark.com/goods/23008837";


  return (
    <div className="detail-container">
       뮤지컬 〈레베카〉 10주년 기념공연
       <p>(Showing details for Zone index: {zoneIndex})</p>
      <ImageGrid images={images} />
      <div className="detail-info">
        <h1>상세정보</h1>
        <p className="area">서울</p>
        <p className="place">블루스퀘어(한남동)</p>
        <p className="realmName">연극</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button className="book-button"> 사이트 이동 </button>
        </a>
      </div>
      <div className="detail-description">
        <p>
          공연설명
        </p>
        <DetailMap gpsX={126.9874657} gpsY={37.5297816} />
      </div>
    </div>
  );
}

export default ZoneDetail;
