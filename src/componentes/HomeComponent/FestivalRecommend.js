import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FestivalRecommend.css';
import FetchMyData from '../FetchMyData';
import FetchGenreData from '../FetchGenreData';
import { useSelector } from "react-redux";
function FestivalRecommend() {
  const [data, setData] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const initialLocation = '서울'; // 이 값을 원하는 기본값으로 설정하세요.
  const location = useSelector((state) => state.send.value) || initialLocation;
  const [NoData,setNoData]=useState(false);
  useEffect(() => {
    async function fetchData(code) {
      try {
        let fetchedData = await FetchGenreData({ code: "B000" });
        const filteredData = fetchedData.filter(item => {
          const areaElement = item.elements[6];
          if (areaElement && areaElement.elements && areaElement.elements[0] && areaElement.elements[0].text) {
            return areaElement.elements[0].text === location;
          }
          return false; // 'area' 요소 또는 'elements[0].text'가 없는 경우 필터링하지 않음
        });
        
        console.log("Fetched Data:", fetchedData);
        console.log("Festival filterdata", filteredData);
        if(filteredData.length===0){
          setNoData(true);
        }
        else{
          setNoData(false);
          const slicedData = filteredData.slice(0, 4);
          const thumbnailArray = slicedData.map((item) => {
            return item.elements[7].elements[0].text;
          });
          setData(slicedData);
          setThumbnails(thumbnailArray);
          console.log("Festival realmCode:", code);
          console.log("Festival filterdata", filteredData);

        }
        
        
      } catch (error) {
        console.error('Show Error fetching data:', error);
        setNoData(true);
      }
    }
  
    fetchData();
  }, [location]);

  return (
    <div className="item-box">
      {NoData?(
        <p>해당 지역에 맞는 음악회이 없습니다.</p>
      ):(
        <div className="grid-container">
        {thumbnails.map((image, index) => (
          <div key={index} className="grid-item">
            <Link to={`/detail/${index}`} style={{textDecoration:"none"}}>
              <div className='image_container'>
                <img src={image} alt={`Image ${index}`} />
              </div>
              <p style={{color:'black'}}>{data[index].elements[1].elements[0].text}</p>
            </Link>
          </div>
        ))}
        </div>
      )}
      
    </div>
  );
}

export default FestivalRecommend;
