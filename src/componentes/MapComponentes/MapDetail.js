import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import FetchDetailData from "../FetchDetailData";
import styles from "./MapDetail.module.css";
import { useDispatch } from "react-redux";
import { mdetailtmp } from "../../reducers/markerdetailState";
import { markerdata } from "../../reducers/markerData";

const { kakao } = window;

function MapDetail({ data, index, map }) {
  const [now, setNow] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [place, setPlace] = useState("");
  const [realmName, setRealmName] = useState("");
  const [gpsx, setGpsX] = useState("");
  const [gpsy, setGpsY] = useState("");
  const [seq, setSeq] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    //데이터 받아온거 적용.
    //썸네일, 타이틀 현재 받아옴.
    setNow(data);
    setSeq(data.elements[0].elements[0].text);
    setTitle(data.elements[1].elements[0].text);
    setThumbnail(data.elements[7].elements[0].text);
    setRealmName(data.elements[5].elements[0].text);
    setPlace(data.elements[4].elements[0].text);
    setGpsX(data.elements[8].elements[0].text);
    setGpsY(data.elements[9].elements[0].text);
    fetchData(data.elements[0].elements[0].text);
  }, [now]);

  /** FetchDetailData로 상세설명 데이터 불러오는 곳 */
  async function fetchData(seq) {
    let fetchedData = await FetchDetailData({ seq: seq }); // 이용할 때 ({ seq: seq }) 이 형태 꼭 기억하기
    //console.log("seq:", seq);
    //console.log(fetchedData);
  }

  const onClick = () => {
    let LatLng = new kakao.maps.LatLng(gpsy, gpsx);
    let data = {
      title: title,
      latlng: LatLng,
      thumbnail: thumbnail,
      place: place,
      realmName: realmName,
    };
    dispatch(markerdata(data));
    dispatch(mdetailtmp(true));

    let level = map.getLevel() - 2;
    map.setLevel(level, { anchor: LatLng });
    map.panTo(LatLng);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <Link
        to={{
          //pathname: `/detail/${data?.elements[0]?.elements[0]?.text}`,
          state: {
            seq: seq,
            title: title,
            image: thumbnail,
            place: place,
            realmName: realmName,
            gpsX: gpsx,
            gpsY: gpsy,
          },
        }}
      >
        {now !== null ? (
          <img
            src={thumbnail}
            alt="placeholder"
            style={{ width: 200, height: 200 }}
            onClick={onClick}
          ></img>
        ) : (
          <img
            src="https://via.placeholder.com/320x480"
            alt="placeholder"
          ></img>
        )}

        {now !== null ? (
          <h1 className={styles.truncate}>{title}</h1>
        ) : (
          <h1 className={styles.truncate}>세부사항 표시 {index}</h1>
        )}
      </Link>
    </div>
  );
}
export default MapDetail;
