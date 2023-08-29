import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function MapDetail({ data, index }) {
  const [now, setNow] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    setNow(data);
    setTitle(data.elements[1].elements[0].text);
    console.log(data.elements[1].elements[0].text);
    setThumbnail(data.elements[7].elements[0].text);
    console.log(data.elements[7].elements[0].text);
  }, [now]);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <Link to="/detail">
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
