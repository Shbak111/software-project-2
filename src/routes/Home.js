import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import "../css/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../componentes/Layout/Layout";
import ShowRecommend from "../componentes/HomeComponent/ShowRecommend.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FetchMyData from "../componentes/FetchMyData";
import FetchLocalData from "../componentes/FetchLocalData";
import logo from "../assets/logo.png";
import FastSearch from "../componentes/HomeComponent/FastSearch";
import FestivalRecommend from "../componentes/HomeComponent/FestivalRecommend"
const Home = () => {
  
  const [data, setData] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  useEffect(() => {
    async function fetchData() {
      
      let fetchedLocalData = await FetchLocalData({ local: "부산" });
      console.log("fetchedData: ", fetchedLocalData);
      
      setData(fetchedLocalData);
      setThumbnail(fetchedLocalData[0].elements[7].elements[0].text);
    }

    fetchData();
  }, []);
  

  const images = [
    logo,
    thumbnail,
    "https://via.placeholder.com/1500x1000",
    "https://via.placeholder.com/1500x1000",
    "https://via.placeholder.com/1500x1000",
  ];

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
  };



  return (
    <div className="container">
      {/* 왼쪽구역 */}
      <div className="top-left">
        <FastSearch />
      </div>

      {/* 이미지슬라이드 구역 */}
      <div className="top-right">
        <div className="slide-box">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  className="image"
                  src={image}
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
          <Link to={`/map/`} style={{ textDecoration: "none", marginRight: "10%" }}>
            <p style={{ color: "black" }}>더보기</p>
          </Link>
        </div>
        <div style={{textAlign:'left'}}> 
          <hr style={{width:'90%',marginLeft:0}}></hr>
        </div>
        
        <ShowRecommend></ShowRecommend>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50 }}>
          <p style={{ fontSize: 30 }}>추천행사</p>
          <Link to={`/map/`} style={{ textDecoration: "none", marginRight: "10%" }}>
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
