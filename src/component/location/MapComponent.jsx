import React, { useEffect, useRef } from "react";
import { Circle, Map, MapMarker } from "react-kakao-maps-sdk";

const MapComponent = ({ latitude, longitude, level, searchRange, key }) => {
  const mapRef = useRef();

  useEffect(() => {
    console.log("MapComponent updated");
  }, [latitude, longitude, level, searchRange, key]);

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: "100%", height: "60vh" }}
      level={level}
      ref={mapRef}
      draggable={false}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
      <Circle
        center={{
          lat: latitude,
          lng: longitude,
        }}
        radius={searchRange * 1000}
        strokeWeight={1}
        strokeColor={"#7173ee"}
        strokeOpacity={2}
        fillColor={"#dca3f7"}
        fillOpacity={0.5}
      />
    </Map>
  );
};

export default MapComponent;
