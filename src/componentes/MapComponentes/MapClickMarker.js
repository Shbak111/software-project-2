import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mdetailtmp } from "../../reducers/markerdetailState";
import { Link } from "react-router-dom";

const { kakao } = window;

function MapClickMarker({ map }) {
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
      map.panTo(mdata.latlng);
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
        color: "aliceblue",
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
            <Link
              to={{
                pathname: `/detail/${data}`,
                state: {
                  seq: data.seq,
                  title: data.title,
                  image: data.thumbnail,
                  place: data.place,
                  realmName: data.realmName,
                  gpsX: data.latlng.La,
                  gpsY: data.latlng.Ma,
                },
              }}
            >
              <p style={{ marginTop: 10 }}>
                <text style={{ fontSize: "20px", color: "aliceblue" }}>
                  자세히 보러가기(링크)
                </text>
              </p>
            </Link>
          </div>
          <div>
            <img
              src={data.thumbnail}
              alt="image"
              style={{
                height: "500px",
                width: "380px",
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
