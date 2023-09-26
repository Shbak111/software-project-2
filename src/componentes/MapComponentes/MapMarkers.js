const { kakao } = window;

async function MapMarkers(map, datas, onClick) {
  // 마커 이미지의 이미지 주소입니다
  var imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  //console.log("MapMarker", data);
  var MarkerData = [];

  function fetchMarkerData(datas) {
    var count = 0;
    var tmpData = [...datas];
    tmpData.map((items, indexes) => {
      //console.log("MapMaker", items);
      items.map((item, index) => {
        if (
          item.elements[8] &&
          item.elements[8].elements &&
          item.elements[8].elements[0] &&
          item.elements[9] &&
          item.elements[9].elements &&
          item.elements[9].elements[0] &&
          item.elements[7] &&
          item.elements[7].elements &&
          item.elements[7].elements[0]
        ) {
          var LatLng = new kakao.maps.LatLng(
            item.elements[9].elements[0].text,
            item.elements[8].elements[0].text
          );
          MarkerData.push({
            title: item.elements[1].elements[0].text,
            latlng: LatLng,
            thumbnail: item.elements[7].elements[0].text,
          });
          //console.log(MarkerData[index]);
          count++;
        }
      });
    });
    console.log(count);
  }

  fetchMarkerData(datas);

  for (let i = 0; i < MarkerData.length; i++) {
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: MarkerData[i].latlng,
      content: `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">${MarkerData[i].title}</div>`,
    });

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: MarkerData[i].latlng, // 마커를 표시할 위치
      title: MarkerData[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage, // 마커 이미지
    });

    //클릭 이벤트 달기
    kakao.maps.event.addListener(marker, "click", function () {
      let data = MarkerData[i];
      //console.log(data);
      onClick(data);
    });

    marker.setMap(map);
    infowindow.open(map, marker);
  }
}
export default MapMarkers;
