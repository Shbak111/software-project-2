import React, { useState } from "react";
import SearchBar from "../componentes/TourComponent/SearchBar";
import ZoneBox from "../componentes/TourComponent/ZoneBox"
import Layout from "../componentes/Layout/Layout";
import styles from "../css/Tour.module.css";

function Restaurant_recommendation() {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedZone, setSelectedZone] = useState(''); 
  const handleZoneSelection = (zone) => {
    setSelectedZone(zone);
  };
  const BusanData = [
    '중구',
    '서구',
    '동구',
    '영도구',
    '부산진구',
    '동래구',
    '남구',
    '북구',
    '해운대구',
    '사하구',
    '금정구',
    '강서구',
    '연제구',
    '수영구',
    '사상구',
  ];

  const handleSearch = (searchTerm) => {
    const filteredItems = BusanData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  return (
    <Layout>
    <div className={styles["tour-container"]}>
      <SearchBar data={BusanData} onSearch={handleSearch} onSelectZone={handleZoneSelection} />
      <div className={styles["centered-container"]}>
        <ul className={styles["horizontal-list"]} >
          {filteredData.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <ZoneBox ></ZoneBox>
    </div>
    </Layout>
  );
};


export default Restaurant_recommendation;
