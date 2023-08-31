import React from "react";
import SearchBar from "../componentes/TourComponent/SearchBar";
import ZoneBox from "../componentes/TourComponent/ZoneBox"
import Layout from "../componentes/Layout/Layout";
import styles from "../css/Tour.module.css";

function Restaurant_recommendation() {

  return (
    <Layout>
    <div className={styles["tour-container"]}>
      <SearchBar  />
      <ZoneBox ></ZoneBox>
    </div>
    </Layout>
  );
};


export default Restaurant_recommendation;
