function MapDetail({ data, index }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 30 }}>
      <img src="https://via.placeholder.com/200" alt="placeholder"></img>
      <p style={{ padding: 10 }}>맵 요소 디테일 표시 {index}</p>
    </div>
  );
}
export default MapDetail;
