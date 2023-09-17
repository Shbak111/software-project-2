import React, { useEffect, useState } from "react";
import MapContainer from "../componentes/MapComponentes/MapContainer";
import ScrollDetail from "../componentes/MapComponentes/ScrollDetail";
import styles from "../css/Map.module.css";
import FetchLocalData from "../componentes/FetchLocalData";
import { useSelector, useDispatch } from "react-redux";

const { kakao } = window;

function Map() {
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState(null);
  const [mylocation, setLocation] = useState(null);

  const word = useSelector((state) => state.search.value);

  var geocoder = new kakao.maps.services.Geocoder();

  const onBtnClick = () => {
    setBtnState(!btnState);
  };

  useEffect(() => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        // 좌표 값에 해당하는 행정동, 법정동 정보를 얻는다.
        var callback = function (result, status) {
          console.log("지역 명칭 : " + result[0].region_1depth_name);
          //console.log(result);
          let locname = result[0].region_1depth_name;
          console.log("앞 두글자: ", locname.slice(0, 2));
          locname = locname.slice(0, 2);
          setLocation(locname);
        };
        geocoder.coord2RegionCode(
          locPosition.getLng(),
          locPosition.getLat(),
          callback
        );
      });
    }
  }, [mylocation]);

  useEffect(() => {
    async function fetchData() {
      let fetchedLocalData = await FetchLocalData({
        local: mylocation,
      });
      console.log("fetchedlocalData: ", fetchedLocalData);
      setData(fetchedLocalData);
    }

    if (mylocation != null) {
      fetchData();
    }
    console.log("내 도시", mylocation);
  }, [mylocation]);

  useEffect(() => {
    if (data !== null) {
      console.log("Data fetch success!");
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <button onClick={onBtnClick}>{btnState ? "숨기기" : "보이기"}</button>
      {btnState ? data !== null ? <ScrollDetail data={data} /> : null : null}

      <div style={{ flex: 1 }}>
        {data !== null ? <MapContainer keyword={word} data={data} /> : null}
      </div>
    </div>
  );
}

export default Map;
