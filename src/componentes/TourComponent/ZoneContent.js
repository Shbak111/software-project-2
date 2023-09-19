import React from 'react';
import "../TourComponent/ZoneContent.css"

function ZoneContent({ area, zoneTitle, imageURL0 }) {
    const contentText = zoneTitle
    ? `${zoneTitle}`
    : `Loading...`;
    return (
        <div className="zone-container">
                {contentText}
                <div className="zone-content"> 
                    <img className="img-left" src={imageURL0} alt="Loading.."></img>
                </div>
        </div>
    );
}

export default ZoneContent;
