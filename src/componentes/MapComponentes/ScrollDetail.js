import { useEffect, useState } from "react";
import MapDetail from "./MapDetail";
import InfiniteScroll from "react-infinite-scroll-component";

function ScrollDetail({ data, map }) {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [detailData, setData] = useState(null);

  useEffect(() => {
    setData(data);
    //console.log("detailData : ", detailData);
  }, [detailData]);

  function fetchData() {
    if (detailData != null) {
      const startIndex = items.length;
      const endIndex = startIndex + 5;
      const newItems = detailData.slice(startIndex, endIndex);

      const updatedItems = [...items, ...newItems];

      if (updatedItems.length >= detailData.length) {
        sethasMore(false);
      }
      setItems(updatedItems);
    }
  }

  useEffect(() => {
    fetchData();
  }, [detailData]);

  return (
    <div
      id="scrollableDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        overflow: "auto",
      }}
    >
      <div>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {items.length !== 0 ? (
            items.map((item, index) => {
              return (
                <div key={index}>
                  <MapDetail index={index} data={item} map={map} />
                </div>
              );
            })
          ) : (
            <div>no data</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default ScrollDetail;
