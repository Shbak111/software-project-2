import React, { useEffect, useState } from "react";
import MapContainer from "../componentes/MapComponentes/MapContainer";
import ScrollDetail from "../componentes/MapComponentes/ScrollDetail";
import FetchMyData from "../componentes/FetchMyData";
import styles from "../css/Map.module.css";
import FetchLocalData from "../componentes/FetchLocalData";
import { useSelector, useDispatch } from "react-redux";

function Map() {
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState(null);

  const word = useSelector((state) => state.send.value);

  useEffect(() => {
    console.log("redux word 값: ", word);
  }, [word]);

  const onBtnClick = () => {
    setBtnState(!btnState);
  };

  useEffect(() => {
    async function fetchData() {
      let fetchedData = await FetchMyData();
      //let fetchedLocalData = await FetchLocalData({ local: "대구" });
      console.log("fetchedData: ", fetchedData);
      //console.log("fetchedlocalData: ", fetchedLocalData);
      setData(fetchedData);
    }

    fetchData();
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
