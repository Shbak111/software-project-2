import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import FetchDetailData from "../FetchDetailData";

function MapDetail({ data, index }) {
  const [now, setNow] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [place, setPlace] = useState("");
  const [realmName,setRealmName]=useState("");
  //const [seq, setSeq] = useState("");

  useEffect(() => {
    //데이터 받아온거 적용.
    //썸네일, 타이틀 현재 받아옴.
    setNow(data);
    setTitle(data.elements[1].elements[0].text);
    setThumbnail(data.elements[7].elements[0].text);
    setRealmName(data.elements[5].elements[0].text);
    setPlace(data.elements[4].elements[0].text);
    fetchData(data.elements[0].elements[0].text);
  }, [now]);

  /** FetchDetailData로 상세설명 데이터 불러오는 곳 */
  async function fetchData(seq) {
    let fetchedData = await FetchDetailData({ seq: seq }); // 이용할 때 ({ seq: seq }) 이 형태 꼭 기억하기
    console.log("seq:", seq);
    console.log(fetchedData);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <Link
        to={{
          pathname: `/detail/${data}`,
          state: {
            title: title,
            image: thumbnail,
            place: place,
            realmName: realmName,
            },
          }}
          >
        {now !== null ? (
          <img
            src={thumbnail}
            alt="placeholder"
            style={{ width: 200, height: 200 }}
          ></img>
        ) : (
          <img
            src="https://via.placeholder.com/320x480"
            alt="placeholder"
          ></img>
        )}
      </Link>

      <Link to="/detail">
        {now !== null ? (
          <h1 style={{ padding: 10 }}>{title}</h1>
        ) : (
          <h1 style={{ padding: 10 }}>세부사항 표시 {index}</h1>
        )}
      </Link>
    </div>
  );
}
export default MapDetail;
