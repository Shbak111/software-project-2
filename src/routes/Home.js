import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "../css/Home.css";
import FastSearch from "../componentes/HomeComponent/FastSearch";
import FestivalRecommend from "../componentes/HomeComponent/FestivalRecommend";
import ShowRecommend from "../componentes/HomeComponent/ShowRecommend.js";
import ImageSlide from "../componentes/HomeComponent/ImageSlide";
const Home = () => {
  return (
    <div className="container">
      {/* 왼쪽구역 */}
      <div className="top-left">
        <FastSearch />
      </div>

      {/* 이미지슬라이드 구역 */}
      <div className="top-right">
        <ImageSlide></ImageSlide>
      </div>

      <div className="bottom-right">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 30 }}>추천공연</p>
          <Link to={`/Restaurant_recommendation/`} style={{ textDecoration: "none", marginRight: "10%" }}>
            <p style={{ color: "black" }}>더보기</p>
          </Link>
        </div>
        <div style={{textAlign:'left'}}> 
          <hr style={{width:'90%',marginLeft:0}}></hr>
        </div>
        
        <ShowRecommend></ShowRecommend>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50 }}>
          <p style={{ fontSize: 30 }}>추천행사</p>
          <Link to={`/Restaurant_recommendation//`} style={{ textDecoration: "none", marginRight: "10%" }}>
            <p style={{ color: "black" }}>더보기</p>
          </Link>
        </div>
        <div style={{textAlign:'left'}}> 
          <hr style={{width:'90%',marginLeft:0}}></hr>
        </div>
        <FestivalRecommend></FestivalRecommend>
      </div>
    </div>
  );
};

export default Home;
