import React from "react";
import "./ImageGrid.css";

function ImageGrid({ images }) {
  return (
    <div className="image-grid">
      <div className="left-column">
        <div className="image-item">
          <img className="first-image" src={images[0].url} alt={`Image 0`} />
        </div>
      </div>
      <div className="right-column">
        {images.slice(1, 4).map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGrid;
