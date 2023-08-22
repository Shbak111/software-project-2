import React, { useState } from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../css/HHeader.css';
import logo from "../assets/logo.png"
import map from "../assets/map.png"
import tour from "../assets/tour.png"
import test from "../assets/test.png"
import SearchBar from './TourComponent/SearchBar';

export default function Header (){
    const [zoneTitle, setZoneTitle] = useState('관광지 추천코스'); // title바꿈 -> Hello,부산
    const handleZoneButtonClick = (zone) => {
        // Update the title based on the clicked zone
        setZoneTitle(`Hello, ${zone}`);
      };

    return(
        <div className="header-container">
            <div className="header-wrap">
                    <Link  to="/">
                        <img src={logo} style={{margin:"10px"}}></img>
                    </Link>
                    <div className="swiper-area">
                        <div id="zone1" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('서울')}>서울</button>
                        </div>
                        <div id="zone2" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('부산')}>부산</button>
                        </div>
                        <div id="zone3" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('대구')}>대구</button>
                        </div>
                        <div id="zone4" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('인천')}>인천</button>
                        </div>
                        <div id="zone5" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('광주')}>광주</button>
                        </div>
                        <div id="zone6" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('대전')}>대전</button>
                        </div>
                        <div id="zone7" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('울산')}>울산</button>
                        </div>
                        <div id="zone8" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('세종')}>세종</button>
                        </div>
                        <div id="zone9" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('경기')}>경기</button>
                        </div>
                        <div id="zone10" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('강원')}>강원</button>
                        </div>
                        <div id="zone11" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('충북')}>충북</button>
                        </div>
                        <div id="zone12" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('충남')}>충남</button>
                        </div>
                        <div id="zone13" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('전북')}>전북</button>
                        </div>
                        <div id="zone14" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('전남')}>전남</button>
                        </div>
                        <div id="zone15" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('경북')}>경북</button>
                        </div>
                        <div id="zone16" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('경남')}>경남</button>
                        </div>
                        <div id="zone17" style={{paddingRight:15}}>
                        <button type='button' className="btn" onClick={() => handleZoneButtonClick('제주')}>제주</button>
                        </div>
                    </div>
                    <SearchBar  />
                        <Link to="/map">
                            <img src={map}></img>
                        </Link>
                        <Link  to="/Data">
                            <img src={test}></img>
                        </Link>
                        <Link  to="/Restaurant_recommendation">
                            <img src={tour}></img>
                        </Link>
            </div>
        </div>
    )
}
