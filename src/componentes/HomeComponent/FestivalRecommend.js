import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FestivalRecommend.css";
import FetchGenreData from "../FetchGenreData";
import { useSelector } from "react-redux";

function FestivalRecommend() {
  const [data, setData] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const initialLocation = "서울";
  const location = useSelector((state) => state.send.value) || initialLocation;
  const [NoData, setNoData] = useState(false);
  useEffect(() => {
    async function fetchData(code) {
      try {
        // A000 코드와 B000 코드에서 데이터 가져오기
        const dataA = await FetchGenreData({ code: "B000" }); //음악
        const dataB = await FetchGenreData({ code: "C000" }); //미술

        // 두 데이터 합치기
        const fetchedData = [...dataA, ...dataB];
        console.log(fetchedData)
        const filteredData = fetchedData.filter((item) => {
          const areaElement = item.elements[6];
          if (
            areaElement&&
            areaElement.elements&&
            areaElement.elements[0]&&
            areaElement.elements[0].text
          ) {
            return areaElement.elements[0].text === location;
          }
          return false; // 'area' 요소 또는 'elements[0].text'가 없는 경우 필터링하지 않음
        });
        if (filteredData.length === 0) {
          setNoData(true);
        }
        else {
          setNoData(false);
          const slicedData = filteredData.slice(0, 4);
          const thumbnailArray = slicedData.map((item) => {
            return item.elements[7].elements[0].text;
          });

          setData(slicedData);
          setThumbnails(thumbnailArray);
          console.log("Festival filterdata", filteredData);
        }
      } catch (error) {
        console.error("Festival Error fetching data:", error);
        setNoData(true);
      }
    }

    fetchData(["A000", "B000"]);
  }, [location]);

  return (
    <div className="item-box">
      {NoData ? (
        <p>해당 지역에 맞는 음악,미술이 없습니다.</p>
      ) : (
        <div className="grid-container">
          {thumbnails.map((image, index) => (
            <div key={index} className="grid-item">
              <Link
                to={{
                  pathname: `/detail/${data[index]?.elements[0]?.elements[0]?.text}`,
                  state: {
                    seq: data[index]?.elements[0]?.elements[0]?.text,
                    title: data[index]?.elements[1]?.elements[0]?.text,
                    place: data[index]?.elements[4]?.elements[0]?.text,
                    realmName: data[index]?.elements[5]?.elements[0]?.text,
                    area: data[index]?.elements[6]?.elements[0]?.text,
                    image: data[index]?.elements[7]?.elements[0]?.text,
                    gpsX: data[index]?.elements[8]?.elements[0]?.text,
                    gpsY: data[index]?.elements[9]?.elements[0]?.text,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="image_container">
                  <img src={image} alt={`Image ${index}`} />
                </div>
                <p style={{ color: "black" }}>
                  {data[index].elements[1].elements[0].text}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FestivalRecommend;
