import { Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MarginEmpty from "../../payment/MarginEmpty";

function useDidMountEffect(func, deps) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
}

function MapTest({ onAddressUpdate }) {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [clickedAddr, setClickedAddr] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          37.49934209591508,
          127.02901006028125
        ),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  useDidMountEffect(() => {
    window.kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            var addr = !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            console.log(addr);

            marker.setMap(null);
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            onAddressUpdate(addr);
            setClickedAddr(addr);
          }
        }
      );
    });
  }, [map, marker, onAddressUpdate]);

  return (
    <div>
      <Paper>
        {" "}
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
        <MarginEmpty value={10} />
        {clickedAddr && (
          <div style={{ marginLeft: "10px" }}>
            <Typography variant="body1">주소: {clickedAddr}</Typography>
          </div>
        )}
      </Paper>
    </div>
  );
}

export default MapTest;
