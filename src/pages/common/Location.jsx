// import { useState, useEffect, useRef } from "react";

// const Location = () => {
//   const [coords, setCoords] = useState({ latitude: null, longitude: null });
//   useEffect(() => {
//     const container = document.getElementById("map"); // 지도를 표시할 div
//     const { naver } = window; // let markerList = []; // const HOME_PATH = window.HOME_PATH || '.';
//     navigator.geolocation.getCurrentPosition(function (pos) {
//       setCoords({
//         latitude: pos.coords.latitude,
//         longitude: pos.coords.longitude,
//       });
//       alert("현재 위치는 : " + coords.latitude + ", " + coords.longitude);
//       const position = new naver.maps.LatLng(coords.latitude, coords.longitude);
//       const mapOptions = {
//         center: position,
//         zoom: 17,
//         minZoom: 6,
//         zoomControl: true,
//         zoomControlOptions: {
//           position: naver.maps.Position.TOP_RIGHT,
//         },
//       };
//       const map = new naver.maps.Map(container, mapOptions);
//       const markerOptions = {
//         position: position.destinationPoint(90, 15),
//         map: map,
//       };
//       const marker = new naver.maps.Marker(markerOptions);
//       console.log("loading navermap");
//     }, []);
//   });
//   return (
//     <>
//        <div id="map" style={{ width: "100%", height: "800px" }}></div>
//     </>
//   );
// };
// export default Location;
