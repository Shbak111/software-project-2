import MapDetail from "./MapDetail";

function ScrollDetail() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "auto",
      }}
    >
      <MapDetail />
      <MapDetail />
      <MapDetail />
      <MapDetail />
      <MapDetail />
    </div>
  );
}
export default ScrollDetail;
