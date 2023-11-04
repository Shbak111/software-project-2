import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlide.css"
import FetchLocalData from "../FetchLocalData";
import logo from "../../assets/logo.png";

function ImageSlide() {
    const [data, setData] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    useEffect(() => {
        async function fetchData() {
        try{
            let fetchedLocalData = await FetchLocalData({ local: "서울" });
            const slicedData = fetchedLocalData.slice(0, 4);
            const thumbnailArray = slicedData.map((item) => {
                return item.elements[7].elements[0].text;
            });
            setData(slicedData);
            setThumbnail(thumbnailArray);

        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }
    fetchData();
  }, []);
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
  return(
    <div className="slide-box">
          <Slider {...settings}>
            {thumbnail.map((image, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "center" }}>
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
  )
}
export default ImageSlide;