import React, { useState, useEffect } from "react";
import ZoneContent from "./ZoneContent";
import FetchLocalData from "../FetchLocalData";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

function ZoneBox() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState("");
  const [tmp, setTmp] = useState(false);
  const location = useSelector((state) => state.send.value);
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
      setTmp(!tmp);
      console.log("Data fetch success!");
    }

    fetchData();
  }, [location]);

  // 백승훈 추가내용
  // DetailMap에 추가된것은 지도에 카테고리 검색으로 마커를 찍어오는 것이고
  // 거기서 착안해서 지정좌표에 대한 카테고리 검색으로 주위 음식점을 리스트로 받아오는 파트.
  useEffect(() => {
    console.log("음식점 찾기");
    const { kakao } = window;

    var places = new kakao.maps.services.Places();

    var callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        console.log("#######################");
        console.log(result);
      }
    };
    items.map((item, index) => {
      // 음식점 코드 검색
      places.categorySearch("FD6", callback, {
        // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
        location: new kakao.maps.LatLng(
          data[index]?.elements[9]?.elements[0]?.text,
          data[index]?.elements[8]?.elements[0]?.text
        ),
        size: 3,
        page: 1,
        //sort: kakao.maps.services.SortBy.DISTANCE,
      });
      console.log(data[index]?.elements[1]?.elements[0]?.text);
    });
  }, [tmp]);

  return (
    <div>
      <div>
        {items.length !== 0 ? (
          items.map((item, index) => (
            <div key={index} style={{ cursor: "pointer" }}>
              <Link
                to={{
                  pathname: `/detail/${data[index]?.elements[0]?.elements[0]?.text}`,
                  state: {
                    title: data[index]?.elements[1]?.elements[0]?.text,
                    place: data[index]?.elements[4]?.elements[0]?.text,
                    realmName: data[index]?.elements[5]?.elements[0]?.text,
                    area: data[index]?.elements[6]?.elements[0]?.text,
                    image: data[index]?.elements[7]?.elements[0]?.text,
                    gpsX: data[index]?.elements[8]?.elements[0]?.text,
                    gpsY: data[index]?.elements[9]?.elements[0]?.text,
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
