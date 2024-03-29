import React, { useState,useEffect  } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../css/HHeader.css";
import logo from "../assets/logo.png";
import map from "../assets/map.png";
import michelin from "../assets/michelin.png";
import test from "../assets/test.png";
import login from "../assets/login.png";
import SearchBar from "./TourComponent/SearchBar";
import MapSearch from "./MapComponentes/MapSearch";
import { btntmp } from "../reducers/buttonState";
import { sendword } from "../reducers/sendKeyword";
import { useDispatch, useSelector } from "react-redux";
import { searchword } from "../reducers/searchWord";
import { getNickname } from "./LoginComponent/user";

export default function Header() {
  const dispatch = useDispatch();
  const tmp = useSelector((state) => state.btn.value);

  const handleButtonClick = (location) => {
    console.log(location);
    dispatch(sendword(location));
    dispatch(searchword(location));
  };

  const onMapClick = () => {
    dispatch(btntmp(false));
  };
  const onOtherClick = () => {
    dispatch(btntmp(true));
  };

  const user = getNickname();

  return (
    <div className="header-container">
      <div className="header-wrap">
        <Link to="/">
          <img
            src={logo}
            className="logo-image"
            alt="Logo"
            onClick={onOtherClick}
          ></img>
        </Link>
        <div className="swiper-area">
          <div id="zone1" style={{ paddingRight: 15 }}>
            <button className="btn" onClick={() => handleButtonClick("서울")}>
              서울
            </button>
          </div>
          <div id="zone2" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("부산")}
            >
              부산
            </button>
          </div>
          <div id="zone3" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("대구")}
            >
              대구
            </button>
          </div>
          <div id="zone4" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("인천")}
            >
              인천
            </button>
          </div>
          <div id="zone5" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("광주")}
            >
              광주
            </button>
          </div>
          <div id="zone6" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("대전")}
            >
              대전
            </button>
          </div>
          <div id="zone7" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("울산")}
            >
              울산
            </button>
          </div>
          <div id="zone8" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("세종")}
            >
              세종
            </button>
          </div>
          <div id="zone9" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("경기")}
            >
              경기
            </button>
          </div>
          <div id="zone10" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("강원")}
            >
              강원
            </button>
          </div>
          <div id="zone11" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("충북")}
            >
              충북
            </button>
          </div>
          <div id="zone12" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("충남")}
            >
              충남
            </button>
          </div>
          <div id="zone13" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("전북")}
            >
              전북
            </button>
          </div>
          <div id="zone14" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("전남")}
            >
              전남
            </button>
          </div>
          <div id="zone15" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("경북")}
            >
              경북
            </button>
          </div>
          <div id="zone16" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("경남")}
            >
              경남
            </button>
          </div>
          <div id="zone17" style={{ paddingRight: 15 }}>
            <button
              type="button"
              className="btn"
              onClick={() => handleButtonClick("제주")}
            >
              제주
            </button>
          </div>
        </div>
        <div className="icon-links">
          <Link to={`/map`}>
            <img
              src={map}
              className="header-icon"
              alt="Map"
              onClick={onMapClick}
            />
          </Link>
          <Link to="/Community">
            <img
              src={test}
              className="header-icon"
              alt="Test"
              onClick={onOtherClick}
            />
          </Link>
          <Link to="/Restaurant_recommendation">
            <img
              src={michelin}
              className="header-icon"
              alt="Michelin"
              onClick={onOtherClick}
            />
          </Link>
          {user ? ( 
            <Link to="/Mypage">
              <img
                src={login}
                className="header-icon"
                alt="Login"
                onClick={onOtherClick}
              />
            </Link>
          ) : (
            <Link to="/Login">
              <img
                src={login}
                className="header-icon"
                alt="Login"
                onClick={onOtherClick}
              />
            </Link>
          )}
        </div>
        {tmp ? <SearchBar /> : <MapSearch />}
      </div>
    </div>
  );
}
