import React from 'react';
import "../TourComponent/ZoneContent.css"

function ZoneContent({ index, data, zoneTitle }) {
    const contentText = zoneTitle
    ? `Zone Content for ${zoneTitle}`
    : `Zone Content - Index: ${index}, Data: ${data}`;
    return (
        <div className="zone-container">{contentText}
        <div className="zone-content"> 
            <img className="img-left" src="https://via.placeholder.com/320x480" alt="placeholder"></img>
            <img className="img-middle" src="https://via.placeholder.com/320x480" alt="placeholder"></img>
            <img className="img-middle" src="https://via.placeholder.com/320x480" alt="placeholder"></img>
            <img className="img-right" src="https://via.placeholder.com/320x480" alt="placeholder"></img>
        </div>
        </div>
    );
}

export default ZoneContent;
