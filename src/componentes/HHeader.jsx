import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../css/HHeader.css';
export default function Header (){
    return(
        <div className="header-container">
            <div className="header-wrap">
                <div className="header-left-wrap">
                    <Link style={{display:'flex',alignitems:'center'}}className="header-Home" to="/">
                        <p >Home</p>
                    </Link>
                    <ul>
                        <li>
                            <Link className="header-banner" to="/map">
                                <p>map이동</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-banner" to="/Detail">
                                <p>Detail이동</p>
                            </Link>
                        </li>
                        <li>
                            <Link className="header-banner" to="/Restaurant_recommendation">
                                <p>식당추천</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
