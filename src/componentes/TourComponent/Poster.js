import React from "react";
import burger from "../../assets/1x/burger.png";
import steak from "../../assets/1x/steak.png";
import western from "../../assets/1x/western1.png";
import japanese from "../../assets/1x/japanese.png";
import default_r from "../../assets/1x/default_r.png";
import korean1 from "../../assets/1x/korean1.png";
import noodle from "../../assets/1x/noodle.png";
import "./Poster.css";


function Poster({ category_name, place_name, place_url }) {
  let imagePath;
  let className;

  if (category_name) {
    if (category_name.startsWith("음식점 > 한식 > 국수")) {
        imagePath = noodle;
        className = "noodle_restaurant";
    }else if (category_name.startsWith("음식점 > 한식")) {
        imagePath = korean1;
        className = "korean_restaurant";
    } else if (category_name.startsWith("음식점 > 일식")) {
        imagePath = japanese;
        className = "japanese_restaurant";
    } else if (category_name.startsWith("음식점 > 양식 > 스테이크,립")) {
        imagePath = steak;
        className = "steak_restaurant";
    } else if (category_name.startsWith("음식점 > 양식 > 햄버거")) {
        imagePath = burger;
        className = "burger_restaurant";
    } else if (category_name.startsWith("음식점 > 양식")) {
        imagePath = western;
        className = "western_restaurant";
    } else {
        imagePath = default_r;
        className = "default_restaurant";
    }
  } else {
        imagePath = default_r;
        className = "default_restaurant";
  }

  return (
    <div className={"restaurant_poster_container"}>
      <a href={place_url}>
        <img className="restaurant_poster" src={imagePath} alt="placeholder" />
        <div className={`${className}`}>{place_name}</div>
      </a>
    </div>
  );
}

export default Poster;
