import r_icon from "../../assets/r_icon.png";

const { kakao } = window;

/** 카카오맵 api를 이용해서 지정좌표 주위의 음식점을 찾아오는 함수 */
function FindRestaurant(map) {
  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 장소 검색 객체를 생성합니다
  var ps = new kakao.maps.services.Places(map);

  // 카테고리로 음식점을 검색합니다 ("https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category") 여기서 코드 확인
  ps.categorySearch("FD6", placesSearchCB, { useMapBounds: true });

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        displayMarker(data[i]);
      }
    }
  }

  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var imageSrc = r_icon, //마커 이미지의 주소
      imageSize = new kakao.maps.Size(25, 34.5),// 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(13.5, 34.5) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
      image : markerImage, //마커이미지 연결
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        '<div style="padding:5px; font-size:12px; color:#000000; " >' +
          place.place_name +
          "</div>"
      );
      console.log(place.place_name);
      infowindow.open(map, marker);
    });
  }
}

export default FindRestaurant;
