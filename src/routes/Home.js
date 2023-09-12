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
  var geocoder = new kakao.maps.services.Geocoder();
  const dispatch = useDispatch();
  const initialLocation = "서울"; // 이 값을 원하는 기본값으로 설정하세요.
  const location = useSelector((state) => state.send.value) || initialLocation;

  useEffect(() => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 좌표 값에 해당하는 행정동, 법정동 정보를 얻는다.
        var callback = function (result, status) {
          console.log("지역 명칭 : " + result[0].region_1depth_name);
          console.log("행정구역 코드 : " + result[0].code);
          console.log(result);
          let locname = result[0].region_1depth_name;
          console.log("앞 두글자: ", locname.slice(0, 2));
          dispatch(sendlocation(locname.slice(0, 2)));
        };
        geocoder.coord2RegionCode(
          locPosition.getLng(),
          locPosition.getLat(),
          callback
        );
      });
    }
  }, []);

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
