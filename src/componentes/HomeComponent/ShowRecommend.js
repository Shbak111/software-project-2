import React from 'react';
import { Link } from 'react-router-dom';
import './ShowRecommend.css';

function ShowRecommend() {
  const images = [
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
    'https://via.placeholder.com/400x300',
  ];

  return (
    <div className="item-box">
      <div className="grid-container">
        {images.map((images, index) => (
          <div key={index} className="grid-item">
            <Link to={`/detail/${index}`}>
              <img src={images} alt={`Image ${index}`} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowRecommend;
