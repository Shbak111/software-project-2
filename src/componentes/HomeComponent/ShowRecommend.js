import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ShowRecommend.css';
import FetchMyData from '../FetchMyData';
import FetchGenreData from '../FetchGenreData';
import { useSelector } from "react-redux";
function ShowRecommend() {
  const [data, setData] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const initialLocation = '서울'; // 이 값을 원하는 기본값으로 설정하세요.
  const location = useSelector((state) => state.send.value) || initialLocation;
  const [NoData,setNoData]=useState(false);
  useEffect(() => {
    async function fetchData(code) {
      try {
        let fetchedData = await FetchGenreData({ code: "A000" });
        const filteredData = fetchedData.filter(item => item.elements[6].elements[0].text === location);
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
          console.log("Show realmCode:", code);
          console.log("Show filterdata", filteredData);

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
        <p>해당 지역에 맞는 연극이 없습니다.</p>
      ):(
        <div className="grid-container">
        {thumbnails.map((image, index) => (
          <div key={index} className="grid-item">
            <Link to={{
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
           style={{textDecoration:"none"}}>
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

export default ShowRecommend;
