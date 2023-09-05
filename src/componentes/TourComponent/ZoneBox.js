import React, { useState, useEffect } from "react";
import ZoneContent from "./ZoneContent";
import FetchMyData from "../FetchMyData";
import FetchLocalData from "../FetchLocalData";
import {Link} from "react-router-dom/cjs/react-router-dom";

function ZoneBox() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const newItems = Array.from({ length: 10 }, (_, index) => index + 1);
      setItems([...items, ...newItems]);
      let fetchedData = await FetchMyData();
      let localData = await FetchLocalData({ local: "서울" }); 
      console.log("FetchLocalData:", localData);
      console.log(fetchedData);
      
      setData(fetchedData);
      console.log("Data fetch success!");
    }

    fetchData();
  }, []);

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
                      image: data[index]?.elements[7]?.elements[0]?.text,
                    },
                  }}
                >
                <ZoneContent
                  index={index}
                  data={data[index]?.elements[0]?.elements[0]?.text}
                  zoneTitle={data[index]?.elements[1]?.elements[0]?.text} 
                  imageURL0={data[index]?.elements[7]?.elements[0]?.text} 
                  imageURL1={data[index]?.elements[7]?.elements[1]?.text} 
                  // area={data[index]?.elements[6]?.elements[0]?.text || "Default Area"}
                  // place={data[index]?.elements[4]?.elements[0]?.text}
                />
                </Link>
              </div>
            ))
          ) : (
            <div>no data</div>
          )}
        </div>
    </div>
  );
}

export default ZoneBox;
