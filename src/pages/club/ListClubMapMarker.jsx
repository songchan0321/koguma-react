import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { nearClubMapAPI } from "../../apis/api/club";
import EventMarkerContainer from "../../component/club/common/EventMarkerContainer";

const ListClubMapMarker = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    clubList: [],
  });
  const [clubList, setClubList] = useState([]);
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await nearClubMapAPI();
        setClubList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          zIndex: 0,

          // 지도의 크기
          //   width: "80%",
          //   height: "450px",
          height: "450px",
          width: "100%",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <>
            {/* 사용자의 위치에 마커 표시 */}
            <MapMarker position={state.center}>
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "모임을 찾아봐요!"}
              </div>
            </MapMarker>
          </>
        )}
      </Map>
    </>
  );
};

export default ListClubMapMarker;
