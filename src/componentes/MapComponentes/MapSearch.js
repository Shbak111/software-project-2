import { useState } from "react";
import styles from "./MapSearch.module.css";
import { useSelector, useDispatch } from "react-redux";
import { searchword } from "../../reducers/searchWord";

function MapSearch() {
  const dispatch = useDispatch();

  const [val, setVal] = useState("");

  const onChange = (event) => {
    setVal(event.target.value);
  };
  const onClick = () => {
    dispatch(searchword(val));
    setVal("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        onChange={onChange}
        value={val}
        placeholder="지도 검색"
        className={styles.searchField}
      />
      <button onClick={onClick}>지도 검색</button>
    </div>
  );
}

export default MapSearch;
