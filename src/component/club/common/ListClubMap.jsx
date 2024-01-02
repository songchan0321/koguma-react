import React, { useEffect, useState } from "react";
import { nearClubMapAPI } from "../../../apis/api/club";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import EventMarkerContainer from "./EventMarkerContainer";
import { getMemberAPI } from "../../../apis/api/member";

const ListClubMap = () => {
  const [clubList, setClubList] = useState([]);
  const [getMember, setMember] = useState({});
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

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
      const findMember = await getMemberAPI();
      setMember(findMember);
      console.log(findMember);
      const data = await nearClubMapAPI();
      setClubList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "800px",
        }}
        level={4} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <>
            <MapMarker position={state.center}>
              {" "}
              <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "   내 위치입니다 !!"}
              </div>
            </MapMarker>
          </>
        )}
        {clubList.map((club, index) => (
          <EventMarkerContainer key={index} club={club} />
        ))}
      </Map>
    </div>
  );
};

export default ListClubMap;
