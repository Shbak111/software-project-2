import React, { useEffect, useState } from "react";
import MapContainer from "../componentes/MapComponentes/MapContainer";
import ScrollDetail from "../componentes/MapComponentes/ScrollDetail";
import styles from "../css/Map.module.css";
import FetchLocalData from "../componentes/FetchLocalData";
import MapClickMarker from "../componentes/MapComponentes/MapClickMarker";
import GetGeolocation from "../componentes/MapComponentes/GetGeolocation";
import PlaceSearch from "../componentes/MapComponentes/PlaceSearch";
import MapMarkers from "../componentes/MapComponentes/MapMarkers";
import { markerdata } from "../reducers/markerData";
import { mdetailtmp } from "../reducers/markerdetailState";
import { datapersist } from "../reducers/dataPersist";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const { kakao } = window;

function Map() {
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);
  const [mylocation, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const dispatch = useDispatch();
  const dispatch2 = useDispatch();

  const word = useSelector((state) => state.search.value);
  const storedata = useSelector((state) => state.storedata.value);
  const mstate = useSelector((state) => state.mdetail.value);

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
    async function fetchData() {
      const localities = [
        "부산",
        "서울",
        "대전",
        "대구",
        "인천",
        "광주",
        "대전",
        "울산",
        "세종",
        "경기",
        "강원",
        "충북",
        "충남",
        "전북",
        "전남",
        "경북",
        "경남",
      ];

      const dataPromises = localities.map((locality) =>
        FetchLocalData({ local: locality })
      );

      if (storedata === null) {
        try {
          const datas = await Promise.all(dataPromises);
          console.log(datas); // datas 배열에 각 FetchLocalData의 결과가 들어 있음
          setDatas(datas);
          dispatch(datapersist(datas));
          console.log("데이터 패치함");
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else if (storedata) {
        setDatas(storedata);
        console.log("redux persist로 부터 불러옴");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data !== null && datas !== null) {
      console.log("Data fetch success!");
    }
  }, [data, datas]);

  function handleMarkerClick(data) {
    console.log(data);
    dispatch(markerdata(data)); // 클릭 이벤트에서 데이터를 Redux로 전달
    dispatch2(mdetailtmp(true));
    //console.log("마커 데이터 저장 완료");
  }

  /** map 요소를 Map.js 하위 컴포넌트들에서 모두 이용가능하도록 리팩토링.2023-10-28 */
  useEffect(() => {
    const mapContainer = document.getElementById("myMap"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
      };
    const mapinstance = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    //console.log("MapContainer keyword", word);
    //console.log("MapContainer data", datas);
    if (word !== "") {
      PlaceSearch(mapinstance, word);
      console.log("PlaceSearch 실행");
    }

    GetGeolocation(mapinstance);
    console.log("getg 실행됨");

    if (datas !== null) MapMarkers(mapinstance, datas, handleMarkerClick);
    console.log("MapMarker 실행됨");
    setMap(mapinstance);
  }, [datas, word]);

  return (
    <div className={styles.container}>
      <button onClick={onBtnClick}>{btnState ? "숨기기" : "보이기"}</button>
      {btnState ? (
        data !== null ? (
          <ScrollDetail data={data} map={map} />
        ) : null
      ) : null}
      {btnState && mstate ? <MapClickMarker map={map} /> : null}

      <div style={{ flex: 1 }}>
        <div
          id="myMap"
          style={{
            position: "relative",
            overflow: "hidden",
            height: window.innerHeight,
            width: window.innerWidth,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Map;
