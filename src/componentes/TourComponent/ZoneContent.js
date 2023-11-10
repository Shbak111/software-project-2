import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "../TourComponent/ZoneContent.css";
import r_icon from "../../assets/r_icon.png";

function ZoneContent({ area, zoneTitle, imageURL0, datas, map }) {
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
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 마커를 생성하고 지도에 표시합니다
    var imageSrc = r_icon, //마커 이미지의 주소
      imageSize = new kakao.maps.Size(25, 34.5), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(13.5, 34.5) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log("datas: ", datas);
        console.log("result: ", result);
        setRes(result);

        for (let i = 0; i < result.length; i++) {
          // 마커를 생성합니다
          var LatLng = new kakao.maps.LatLng(result[i].y, result[i].x);

          const marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: LatLng, // 마커의 위치
            image: markerImage, //마커 이미지 연결
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent(
              '<div style="padding:5px; font-size:12px; color:#000000; " >' +
                result[i].place_name +
                "</div>"
            );
            infowindow.open(map, marker);
          });
        }
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
          <a href={restaurants[0]?.place_url}>
            <img
              src="https://via.placeholder.com/320x480"
              alt="placeholder"
            ></img>
          </a>
          <p></p>
          <text>{restaurants[0]?.place_name}</text>
        </div>
        <div>
          <a href={restaurants[1]?.place_url}>
            <img
              src="https://via.placeholder.com/320x480"
              alt="placeholder"
            ></img>
          </a>
          <p></p>
          <text>{restaurants[1]?.place_name}</text>
        </div>
        <div>
          <a href={restaurants[2]?.place_url}>
            <img
              src="https://via.placeholder.com/320x480"
              alt="placeholder"
            ></img>
          </a>
          <p></p>
          <text>{restaurants[2]?.place_name}</text>
        </div>
      </div>
    </div>
  );
}

export default ZoneContent;
