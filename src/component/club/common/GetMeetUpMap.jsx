import React, { useEffect, useRef, useState } from "react";
import { getGeo } from "../../../apis/api/common";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function useDidMountEffect(func, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

const GetMeetUpMap = ({ roadAddr }) => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [clickedAddr, setClickedAddr] = useState(null);
  const [meetUpAddr, setMeetUpAddr] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGeo(roadAddr);
        const { latitude, longitude } = data;

        setMeetUpAddr({ latitude, longitude });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [roadAddr]);

  return (
    <div
      style={{
        zIndex: 0,

        // 지도의 크기
        //   width: "80%",
        //   height: "450px",
        height: "10rem",
        width: "20rem",
      }}
      draggable={false}
    >
      <Map
        center={{
          lat: meetUpAddr.latitude,
          lng: meetUpAddr.longitude,
        }}
        style={{
          position: "fixed",
          width: "95%", // 조절할 가로 크기
          height: "30vh", // 조절할 세로 크기
        }}
      >
        <MapMarker
          position={{
            lat: meetUpAddr.latitude,
            lng: meetUpAddr.longitude,
          }}
        />
      </Map>
    </div>
  );
};

export default GetMeetUpMap;
