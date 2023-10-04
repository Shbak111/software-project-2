import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdetailtmp } from "../../reducers/markerdetailState";

function MapClickMarker() {
  const [data, setData] = useState(null);
  const mdata = useSelector((state) => state.markerstore.value);
  const mstate = useSelector((state) => state.mdetail.value);

  const dispatch = useDispatch();
  var mdetail = document.getElementById("mdetail");
  useEffect(() => {
    setData(mdata);
    console.log("마커에서 데이터 얻어옴: ", mdata);
  }, [mdata]);

  const onClick = () => {
    mdetail.style.display = "none";
    dispatch(mdetailtmp(false));
  };

  useEffect(() => {
    if (mdetail && mstate === true) {
      mdetail.style.display = "block";
    }
    console.log("mstate 변경 감지됨", mstate);
  }, [mstate]);

  return (
    <div
      id="mdetail"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "430px",
      }}
    >
      <div style={{ float: "inline-end" }}>
        <button onClick={onClick}>X</button>
      </div>

      {data != null ? (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ padding: 20 }}>
            <text style={{ fontSize: "35px", fontWeight: "bold" }}>
              {data.title}
            </text>
            <p style={{ marginTop: 10 }}>
              <text style={{ fontSize: "20px" }}>{data.place}</text>
            </p>
            <p style={{ marginTop: 10 }}>
              <text style={{ fontSize: "20px" }}>자세히 보러가기(링크)</text>
            </p>
          </div>
          <div>
            <img
              src={data.thumbnail}
              alt="image"
              style={{
                height: "500px",
                width: "350px",
                padding: "20px",
                marginTop: "100px",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MapClickMarker;
