import React, { useState } from "react";
import ZoneContent from "./ZoneContent";
import ZoneDetail from "./ZoneDetail";

function ZoneBox() {
  const [items, setItems] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    const newItems = Array.from({ length: 10 }, (_, index) => index + 1);

    if (items.length >= 10) {
      setHasMore(false);
    }

    setItems([...items, ...newItems]);
  };

  // Load initial data when the component mounts
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleZoneClick = (index) => {
    setSelectedZone(index); // Set selected zone index
  };

  return (
    <div>
      {selectedZone !== null ? (
        // If a zone is selected, show ZoneDetail
        <ZoneDetail zoneIndex={selectedZone} />
      ) : (
        // Otherwise, show ZoneContent list
        <div>
          {items.length !== 0 ? (
            items.map((item, index) => (
              <div key={index} onClick={() => handleZoneClick(index)}>
                <ZoneContent index={index} data={item} selectedZone={selectedZone} />
              </div>
            ))
          ) : (
            <div>no data</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ZoneBox;