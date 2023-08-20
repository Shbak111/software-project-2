import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import '../css/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Select from 'react-select';
import axios from 'axios';
//import img from '/image1.jpg'

const Home = () => {
   

  const images = [
    './image/image1.jpg',
    './image/image2.jpg',
    './image/image3.jpg',
    
  ];

  const settings = {
    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 슬라이드 활성화
    autoplaySpeed: 1700, // 1초마다 슬라이드 전환
  };

  const options=[
    { label : "부산"},
    { label : "서울"},
    { label : "대전"}
  ]
  // const [selectedOption, setSelectedOption] = useState(null);
  // const hadleOptionChange=(option)=>{
  //   setSelectedOption(option);
  // }
  
  return (
    <div className='container'>
      
      <div className="side-box">
        <p>빠른검색</p>
        
        <Select defaultValue="지역" isClearable={false} isSearchable={false}  options={options}/>
        <button >검색</button>
      </div>
      <div className="empty-box">
        <Slider {...settings}>
          {images.map((images, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={images} alt={`${index}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
