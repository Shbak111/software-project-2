import React from 'react';
import "../TourComponent/ZoneContent.css"

function ZoneContent({ index, data, zoneTitle, imageURL0, imageURL1}) {
    const contentText = zoneTitle
    ? `Zone Content for ${zoneTitle}`
    : `Zone Content - Index: ${index}, Data: ${data}`;
    return (
        <div className="zone-container">
                {contentText}
                <div className="zone-content"> 
                    <img className="img-left" src={imageURL0} alt="Loading.."></img>
                    <img className="img-middle" src={imageURL1} alt="Loading.."></img>
                    <img className="img-middle" src="https://via.placeholder.com/320x480" alt="Loading.."></img>
                    <img className="img-right" src="https://via.placeholder.com/320x480" alt="Loading.."></img>
                </div>
        </div>
    );
}

export default ZoneContent;
