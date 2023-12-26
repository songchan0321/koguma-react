import { Button, Card } from "@mui/material";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SharedLocationBubble = ({ content, isOwnMessage }) => {
  const [latitude, longitude] = content.split(",");
  const onClickHandler = () => {
    window.open(
      `https://map.kakao.com/link/map/공유한 장소,${latitude},${longitude}`,
      "_blank"
    );
  };
  return (
    <Card sx={{ maxWidth: "12.5rem", ml: isOwnMessage ? "0" : "0.5rem" }}>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
        style={{
          zIndex: 0,
          height: "10rem",
          width: "12.5rem",
        }}
        draggable={false}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
      <Button
        variant="contained"
        fullWidth
        onClick={onClickHandler}
        sx={{
          backgroundColor: "#D070FB",
          "&:hover": {
            backgroundColor: "#D070FB", // hover 시 배경색을 빨간색으로 변경
          },
          "&:active": {
            backgroundColor: "#D070FB", // 클릭 시 배경색을 파란색으로 변경
          },
        }}
      >
        장소 보기
      </Button>
    </Card>
  );
};

export default SharedLocationBubble;
