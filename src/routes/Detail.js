import React from "react";
import "../css/Detail.css";
import DetailMap from "../componentes/TourComponent/DetailMap";
import { useLocation } from "react-router-dom";

function Detail() {
  const location = useLocation();

  const { title, realmName, image, place, area, gpsX, gpsY } = location.state || {};
  
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
          
          <DetailMap gpsX={gpsX} gpsY={gpsY} />
        </div>
        <img className="poster" src={image} alt="Loading..."/>
      </div>
      );
  }
  export default Detail;
  
