import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ShowRecommend.css';
import FetchMyData from '../FetchMyData';

function ShowRecommend() {
  const [data, setData] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchedData = await FetchMyData();       
        // Slice the first 4 elements from fetchedData
        const slicedData = fetchedData.slice(0, 4);

        // Create an array of thumbnail URLs
        const thumbnailArray = slicedData.map((item) => {
          return item.elements[7].elements[0].text;
        });

        setData(slicedData);
        setThumbnails(thumbnailArray);
        console.log('Data fetch success!');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="item-box">
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
    </div>
  );
}

export default ShowRecommend;
