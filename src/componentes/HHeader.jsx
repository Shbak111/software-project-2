import React from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../css/HHeader.css';
import logo from "../assets/logo.png"
import map from "../assets/map.png"
import tour from "../assets/tour.png"
import test from "../assets/test.png"
import SearchBar from './TourComponent/SearchBar';

export default function Header (){

    return(
        <div className="header-container">
            <div className="header-wrap">
                    <Link  to="/">
                        <img src={logo} className="logo-image" alt="Logo"></img>
                    </Link>
                    <div className="swiper-area">
                        <div id="zone1" style={{paddingRight:15}}>
                        <button type='button' className="btn">서울</button>
                        </div>
                        <div id="zone2" style={{paddingRight:15}}>
                        <button type='button' className="btn" >부산</button>
                        </div>
                        <div id="zone3" style={{paddingRight:15}}>
                        <button type='button' className="btn" >대구</button>
                        </div>
                        <div id="zone4" style={{paddingRight:15}}>
                        <button type='button' className="btn" >인천</button>
                        </div>
                        <div id="zone5" style={{paddingRight:15}}>
                        <button type='button' className="btn" >광주</button>
                        </div>
                        <div id="zone6" style={{paddingRight:15}}>
                        <button type='button' className="btn" >대전</button>
                        </div>
                        <div id="zone7" style={{paddingRight:15}}>
                        <button type='button' className="btn" >울산</button>
                        </div>
                        <div id="zone8" style={{paddingRight:15}}>
                        <button type='button' className="btn" >세종</button>
                        </div>
                        <div id="zone9" style={{paddingRight:15}}>
                        <button type='button' className="btn" >경기</button>
                        </div>
                        <div id="zone10" style={{paddingRight:15}}>
                        <button type='button' className="btn" >강원</button>
                        </div>
                        <div id="zone11" style={{paddingRight:15}}>
                        <button type='button' className="btn" >충북</button>
                        </div>
                        <div id="zone12" style={{paddingRight:15}}>
                        <button type='button' className="btn" >충남</button>
                        </div>
                        <div id="zone13" style={{paddingRight:15}}>
                        <button type='button' className="btn" >전북</button>
                        </div>
                        <div id="zone14" style={{paddingRight:15}}>
                        <button type='button' className="btn" >전남</button>
                        </div>
                        <div id="zone15" style={{paddingRight:15}}>
                        <button type='button' className="btn" >경북</button>
                        </div>
                        <div id="zone16" style={{paddingRight:15}}>
                        <button type='button' className="btn" >경남</button>
                        </div>
                        <div id="zone17" style={{paddingRight:15}}>
                        <button type='button' className="btn" >제주</button>
                        </div>
                    </div>
                    <div className="icon-links">
                        <Link to="/map">
                            <img src={map} className="header-icon" alt="Map" />
                        </Link>
                        <Link to="/Data">
                            <img src={test} className="header-icon" alt="Test" />
                        </Link>
                        <Link to="/Restaurant_recommendation">
                            <img src={tour} className="header-icon" alt="Tour" />
                        </Link>
                    </div>
                </div>
                <SearchBar  />
            </div>
    )
}
