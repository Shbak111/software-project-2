import React, { useEffect, useState } from "react";
import MapContainer from "../componentes/MapComponentes/MapContainer";
import ScrollDetail from "../componentes/MapComponentes/ScrollDetail";
import FetchMyData from "../componentes/FetchMyData";
import styles from "../css/Map.module.css";
import FetchLocalData from "../componentes/FetchLocalData";
import { useSelector } from "react-redux";

const { kakao } = window;

function Map() {
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState(null);

  const word = useSelector((state) => state.search.value);
  const location = useSelector((state) => state.location.value);

  const onBtnClick = () => {
    setBtnState(!btnState);
  };

  useEffect(() => {
    async function fetchData() {
      //let fetchedData = await FetchMyData();
      //console.log("fetchedData: ", fetchedData);
      //setData(fetchedData);
      let fetchedLocalData = await FetchLocalData({
        local: location,
      });
      console.log("fetchedlocalData: ", fetchedLocalData);
      setData(fetchedLocalData);
    }

    fetchData();
    console.log("내 도시", location);
  }, []);

  useEffect(() => {
    if (data != null) {
      console.log("Data fetch success!");
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <button onClick={onBtnClick}>{btnState ? "숨기기" : "보이기"}</button>
      {btnState && data != null ? <ScrollDetail data={data} /> : null}

      <div style={{ flex: 1 }}>
        <MapContainer keyword={word} />
      </div>
    </div>
  );
}

export default Map;
