import React, { useState, useEffect } from "react";
import ZoneContent from "./ZoneContent";
import FetchLocalData from "../FetchLocalData";
import { useSelector } from "react-redux";
import MichelinSeoul from "./MichelinSeoul";
function ZoneBox() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [tmp, setTmp] = useState(false);

  const location = useSelector((state) => state.send.value);
  //console.log(`ZonBox :${location}`);
  useEffect(() => {
    async function fetchData() {
      let localData = await FetchLocalData({ local: location });

      if (!localData || localData.length === 0) {
        // If no data is found for the selected location, default to "서울"
        localData = await FetchLocalData({ local: "서울" });
      }
      if (localData.length > 10) {
        const newItems = Array.from({ length: 6 }, (_, index) => index + 1);
        setItems([items, ...newItems]);
      } else {
        const newItems = Array.from(
          { length: localData.length - 1 },
          (_, index) => index + 1
        );
        setItems([items, ...newItems]);
      }
      setData(localData);
      setTmp(!tmp);
      console.log("Data fetch success!");
    }

    fetchData();
  }, [location]);

  return (
    <div>
      {location === "서울" ? <MichelinSeoul /> : <div />}
      <div>
        {data !== null
          ? items.map((item, index) =>
              data[index] !== null ? (
                <div key={index}>
                  <ZoneContent
                    area={data[index]?.elements[6]?.elements[0]?.text}
                    zoneTitle={data[index]?.elements[1]?.elements[0]?.text}
                    imageURL0={data[index]?.elements[7]?.elements[0]?.text}
                    datas={data[index]}
                  />
                </div>
              ) : null
            )
          : null}
      </div>
    </div>
  );
}

export default ZoneBox;
