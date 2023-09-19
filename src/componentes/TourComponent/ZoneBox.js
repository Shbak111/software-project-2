import React, { useState, useEffect } from "react";
import ZoneContent from "./ZoneContent";
import FetchLocalData from "../FetchLocalData";
import {Link} from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

function ZoneBox() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState("");
  const location = useSelector((state)=>state.send.value);
  console.log(`ZonBox :${location}`);
  useEffect(() => {
    async function fetchData() {
      const newItems = Array.from({ length: 10 }, (_, index) => index + 1);
      setItems([...items, ...newItems]);
      let localData = await FetchLocalData({ local: location });

      if (!localData || localData.length === 0) {
          // If no data is found for the selected location, default to "서울"
          localData = await FetchLocalData({ local: "서울" });
        }
      // }
      setData(localData);

      console.log("Data fetch success!");
    }

    fetchData();
}, [location]);

  return (
    <div>
        <div>
          {items.length !== 0 ? (
            items.map((item, index) => (
              <div key={index} style={{cursor: "pointer"}}>
                <Link
                  to={{
                    pathname: `/detail/${data[index]?.elements[0]?.elements[0]?.text}`,
                    state: {
                      title: data[index]?.elements[1]?.elements[0]?.text,
                      place : data[index]?.elements[4]?.elements[0]?.text,
                      realmName: data[index]?.elements[5]?.elements[0]?.text,
                      area : data[index]?.elements[6]?.elements[0]?.text,
                      image: data[index]?.elements[7]?.elements[0]?.text,
                      gpsX : data[index]?.elements[8]?.elements[0]?.text,
                      gpsY : data[index]?.elements[9]?.elements[0]?.text,
                    },
                  }}
                >
                <ZoneContent
                  area={data[index]?.elements[6]?.elements[0]?.text} 
                  zoneTitle={data[index]?.elements[1]?.elements[0]?.text} 
                  imageURL0={data[index]?.elements[7]?.elements[0]?.text}  
                />
                </Link>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
    </div>
  );
}

export default ZoneBox;
