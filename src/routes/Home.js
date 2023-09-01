import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Select from "react-select";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../componentes/Layout/Layout";
import ShowRecommend from "../componentes/HomeComponent/ShowRecommend.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
//import img from '/image1.jpg'
import logo from "../assets/logo.png";
const Home = () => {
  const images = [
    logo,
    "https://via.placeholder.com/2800x1200",
    "https://via.placeholder.com/2800x1200",
    "https://via.placeholder.com/2800x1200",
    "https://via.placeholder.com/2800x1200",
  ];

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 슬라이드 활성화
    autoplaySpeed: 1700, // 1초마다 슬라이드 전환
  };

  const areaoptions = [
    { label: "서울" },
    { label: "부산" },
    { label: "대구" },
    { label: "인천" },
    { label: "광주" },
    { label: "대전" },
    { label: "울산" },
  ];
  const fieldoptions = [
    { label: "공연" },
    { label: "축제" },
    { label: "뮤지컬" },
  ];
  // const [selectedOption, setSelectedOption] = useState(null);
  // const hadleOptionChange=(option)=>{
  //   setSelectedOption(option);
  // }
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="container">
      <div className="top-left">
        <div className="side-box">
          <p style={{ fontSize: 22 }}>빠른검색</p>
          <div className="select-container">
            <p>지역 : </p>
            <Select
              placeholder="지역"
              defaultValue="NAN"
              isClearable={false}
              isSearchable={false}
              options={areaoptions}
              styles={{ control: (provided) => ({ ...provided, width: 130 }) }}
            />
          </div>
          <div className="select-container">
            <p>분야 : </p>
            <Select
              placeholder="분야"
              defaultValue="NAN"
              isClearable={false}
              isSearchable={false}
              options={fieldoptions}
              styles={{ control: (provided) => ({ ...provided, width: 130 }) }}
            />
          </div>
          <div className="select-container">
            <p>날짜 : </p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="날짜를 선택하세요"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className="top-right">
        <div className="slide-box">
          <Slider {...settings}>
            {images.map((images, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  className="image"
                  src={images}
                  alt={`${index}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="bottom-right">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: 30 }}>추천공연</p>
          <Link to={`/map/`} style={{ textDecoration: "none" }}>
            <p
              style={{
                marginRight: 230,
                textDecoration: "none",
                color: "black",
              }}
            >
              더보기
            </p>
          </Link>
        </div>
        <ShowRecommend></ShowRecommend>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <p style={{ fontSize: 30 }}>추천행사</p>
          <Link to={`/map/`} style={{ textDecoration: "none" }}>
            <p style={{ marginRight: 230, color: "black" }}>더보기</p>
          </Link>
        </div>
        <ShowRecommend></ShowRecommend>
      </div>
    </div>
  );
};

export default Home;
