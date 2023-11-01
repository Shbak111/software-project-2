import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "../TourComponent/ZoneContent.css";

function ZoneContent({ area, zoneTitle, imageURL0, datas }) {
  const [restaurants, setRes] = useState([]);
  const [data, setData] = useState(null);
  const contentText = zoneTitle ? `${zoneTitle}` : `Loading...`;

  // 백승훈 추가내용
  // DetailMap에 추가된것은 지도에 카테고리 검색으로 마커를 찍어오는 것이고
  // 거기서 착안해서 지정좌표에 대한 카테고리 검색으로 주위 음식점을 리스트로 받아오는 파트.
  useEffect(() => {
    //console.log("음식점 찾기");
    const { kakao } = window;
    var places = new kakao.maps.services.Places();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log("datas: ", datas);
        console.log("result: ", result);
        setRes(result);
      }
    };

    // 음식점 코드 검색
    places.categorySearch("FD6", callback, {
      // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
      location: new kakao.maps.LatLng(
        datas?.elements[9]?.elements[0]?.text,
        datas?.elements[8]?.elements[0]?.text
      ),
      size: 3,
      page: 1,
      //sort: kakao.maps.services.SortBy.DISTANCE,
    });
  }, [datas]);

  return (
    <div className="zone-container">
      <p>{contentText}</p>
      <div className="zone-content">
        <div>
          <Link
            to={{
              pathname: `/detail/${datas?.elements[0]?.elements[0]?.text}`,
              state: {
                seq: datas?.elements[0]?.elements[0]?.text,
                title: datas?.elements[1]?.elements[0]?.text,
                place: datas?.elements[4]?.elements[0]?.text,
                realmName: datas?.elements[5]?.elements[0]?.text,
                area: datas?.elements[6]?.elements[0]?.text,
                image: datas?.elements[7]?.elements[0]?.text,
                gpsX: datas?.elements[8]?.elements[0]?.text,
                gpsY: datas?.elements[9]?.elements[0]?.text,
              },
            }}
          >
            <img className="img-left" src={imageURL0} alt="Loading.."></img>
          </Link>
          <p></p>
          <h3 className="truncate">{contentText}</h3>
        </div>

        <div>
          <img
            src="https://via.placeholder.com/320x480"
            alt="placeholder"
          ></img>
          <p></p>
          <text>{restaurants[0]?.place_name}</text>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/320x480"
            alt="placeholder"
          ></img>
          <p></p>
          <text>{restaurants[1]?.place_name}</text>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/320x480"
            alt="placeholder"
          ></img>
          <p></p>
          <text>{restaurants[2]?.place_name}</text>
        </div>
      </div>
    </div>
  );
}

export default ZoneContent;
