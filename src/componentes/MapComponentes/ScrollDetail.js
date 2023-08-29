import { useEffect, useState } from "react";
import MapDetail from "./MapDetail";
import InfiniteScroll from "react-infinite-scroll-component";

function ScrollDetail() {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = () => {
    const newitems = [];
    for (var i = 0; i < 10; i++) {
      newitems.push(i);
    }

    const updatedItems = [...items, ...newitems];
    if (updatedItems.length >= 20) {
      sethasMore(false);
    }
    setItems(updatedItems);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <MapDetail index={index} data={item} />
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
