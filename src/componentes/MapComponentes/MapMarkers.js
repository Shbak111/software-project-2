import FetchLocalData from "../FetchLocalData";

const { kakao } = window;

async function MapMarkers(map, datas) {
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

  var bounds = new kakao.maps.LatLngBounds();

  for (var i = 0; i < MarkerData.length; i++) {
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

    var content =
      `<div class="wrap">` +
      '    <div class="info">' +
      '        <div class="title">' +
      `            ${MarkerData[i].title}` +
      `            <div class="close" onclick="${closeOverlay}" title="닫기"></div>` +
      "        </div>" +
      '        <div class="body">' +
      '            <div class="img">' +
      //`                <img src="${MarkerData[i].thumbnail}" onerror="https://via.placeholder.com/73x70" width="73" height="70">` +
      "           </div>" +
      '            <div class="desc">' +
      '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">자세히 보러가기</a></div>' +
      "            </div>" +
      "        </div>" +
      "    </div>" +
      "</div>";

    // 마커 위에 커스텀오버레이를 표시합니다
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    try {
      var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: MarkerData[i].latlng,
      });
    } catch (e) {
      console.log(e);
    }
    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    kakao.maps.event.addListener(marker, "click", makeClickOverlay(map));

    overlay.setVisible(false);
    marker.setMap(map);
    infowindow.open(map, marker);
  }

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  function closeOverlay() {
    overlay.setMap(null);
  }

  // 이벤트 리스너로는 클로저를 만들어 등록합니다
  // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
  function makeClickOverlay(map) {
    return function () {
      overlay.setMap(map);
      overlay.setVisible(true);
    };
  }
}
export default MapMarkers;
