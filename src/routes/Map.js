import React, { useEffect, useState } from "react";
import MapContainer from "../componentes/MapComponentes/MapContainer";
import ScrollDetail from "../componentes/MapComponentes/ScrollDetail";
import FetchMyData from "../componentes/FetchMyData";
import styles from "../css/Map.module.css";

function Map() {
  const [val, setVal] = useState("");
  const [keyword, setKeyword] = useState("");
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState(null);

  const onChange = (event) => {
    setVal(event.target.value);
  };
  const onClick = () => {
    setKeyword(val);
  };
  const onBtnClick = () => {
    setBtnState(!btnState);
  };

  useEffect(() => {
    async function fetchData() {
      let fetchedData = await FetchMyData();
      setData(fetchedData);
      console.log("Data fetch success!");
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <button onClick={onBtnClick}>{btnState ? "숨기기" : "보이기"}</button>
      {btnState ? <ScrollDetail /> : null}

      <div style={{ flex: 1 }}>
        <input onChange={onChange} value={val} placeholder="검색" />
        <button onClick={onClick}>검색</button>
        <MapContainer keyword={keyword} />
      </div>
    </div>
  );
}

export default Map;
