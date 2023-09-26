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
    <div id="mdetail">
      {data != null ? <button onClick={onClick}>X</button> : null}
      {data != null ? data.title : null}
    </div>
  );
}

export default MapClickMarker;
