import React, { useEffect, useRef, useState } from "react";

function useDidMountEffect(func, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

function MapTest() {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  // 1) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  // 2) 최초 렌더링 시에는 제외하고 map이 변경되면 실행
  useDidMountEffect(() => {
    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            var addr = !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            // 클릭한 위치 주소를 가져온다.
            console.log(addr);

            // 기존 마커를 제거하고 새로운 마커를 넣는다.
            marker.setMap(null);
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
          }
        }
      );
    });
  }, [map]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
}

export default MapTest;
