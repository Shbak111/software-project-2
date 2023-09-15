import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "../css/Home.css";
import FastSearch from "../componentes/HomeComponent/FastSearch";
import FestivalRecommend from "../componentes/HomeComponent/FestivalRecommend";
import ShowRecommend from "../componentes/HomeComponent/ShowRecommend.js";
import ImageSlide from "../componentes/HomeComponent/ImageSlide";
import { useDispatch, useSelector } from "react-redux";
import { sendlocation } from "../reducers/sendLocation";
const { kakao } = window;

const Home = () => {
  const initialLocation = "서울"; // 이 값을 원하는 기본값으로 설정하세요.
  const location = useSelector((state) => state.send.value) || initialLocation;

  return (
    <div>
      {/* 왼쪽구역 */}
      <div className="top-left">
        <FastSearch />
      </div>

      {/* 이미지슬라이드 구역 */}
      <div className="top-right">
        <ImageSlide></ImageSlide>
      </div>

      <div className="bottom-right">
        <p style={{ color: "gray", fontSize: "15px" }}>지역 :{location}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 30 }}>인기연극</p>
          <Link
            to={`/Restaurant_recommendation/`}
            style={{ textDecoration: "none", marginRight: "10%" }}
          >
            <p style={{ color: "black" }}>더보기</p>
          </Link>
        </div>
        <div style={{ textAlign: "left" }}>
          <hr style={{ width: "90%", marginLeft: 0 }}></hr>
        </div>

        <ShowRecommend></ShowRecommend>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <p style={{ fontSize: 30 }}>음악,미술</p>
          <Link
            to={`/Restaurant_recommendation//`}
            style={{ textDecoration: "none", marginRight: "10%" }}
          >
            <p style={{ color: "black" }}>더보기</p>
          </Link>
        </div>
        <div style={{ textAlign: "left" }}>
          <hr style={{ width: "90%", marginLeft: 0 }}></hr>
        </div>
        <FestivalRecommend></FestivalRecommend>
      </div>
    </div>
  );
};

export default Home;
