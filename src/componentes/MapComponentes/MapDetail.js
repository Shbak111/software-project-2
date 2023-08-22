import { Link } from "react-router-dom/cjs/react-router-dom";

function MapDetail({ data, index }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <Link to="/detail">
        <img src="https://via.placeholder.com/200" alt="placeholder"></img>
      </Link>

      <Link to="/detail">
        <h1 style={{ padding: 10 }}>맵 요소 디테일 표시 {index}</h1>
      </Link>
    </div>
  );
}
export default MapDetail;
