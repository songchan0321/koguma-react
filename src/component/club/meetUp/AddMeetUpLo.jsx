import React, { useState, useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const AddMeetUpLo = ({ handleAddressUpdate }) => {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState(""); // 추가: 주소를 입력받을 상태

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const initialMap = new window.daum.maps.Map(mapContainer, {
      center: new window.daum.maps.LatLng(37.537187, 127.005476),
      level: 5,
    });
    const initialGeocoder = new window.daum.maps.services.Geocoder();
    const initialMarker = new window.daum.maps.Marker({
      position: new window.kakao.maps.LatLng(37.537187, 127.005476),
      map: initialMap,
    });

    setMap(initialMap);
    setGeocoder(initialGeocoder);
    setMarker(initialMarker);
  }, []);

  const handleExecDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const selectedAddress = data.address;

        console.log("Selected Address:", selectedAddress);

        // 주소를 입력하는 input 요소의 값을 업데이트
        setAddress(selectedAddress);

        // 상위 컴포넌트로 선택된 주소를 전달
        handleAddressUpdate(selectedAddress);

        if (geocoder) {
          geocoder.addressSearch(data.address, function (results, status) {
            if (status === window.daum.maps.services.Status.OK) {
              const result = results[0];
              const coords = new window.daum.maps.LatLng(result.y, result.x);

              if (map && marker) {
                map.relayout();
                map.setCenter(coords);
                marker.setPosition(coords);
              }
            }
          });
        }
      },
    }).open();
  };

  return (
    <div>
      {/* 주소를 입력하는 input 요소 */}
      <input
        type="text"
        id="sample5_address"
        placeholder="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* 주소 검색 버튼 */}
      <button onClick={handleExecDaumPostcode}>주소 검색</button>
      <br />
      <div
        id="map"
        style={{
          width: "300px",
          height: "300px",
          marginTop: "10px",
          display: "none",
        }}
      ></div>
    </div>
  );
};

export default AddMeetUpLo;
