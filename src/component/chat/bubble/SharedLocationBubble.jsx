import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { a } from "react-spring";

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
      {/* <CardMedia
        sx={{ height: "10rem", width: "12.5rem" }}
        image={`/chat/request.png`}
        title="green iguana"
      /> */}
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }}
        style={{
          zIndex: 0,
          // position: "fixed",
          //   width: "4rem",
          //   margin: "1rem",
          height: "10rem",
          width: "12.5rem",
          // overflow: "hidd",
          //   height: "100%",
        }}
        draggable={false}
        level={3} // 지도의 확대 레벨
        //   onCenterChanged={(map) => {
        //     locationRef.current.level = map.getLevel();
        //     locationRef.current.latitude = map.getCenter().getLat();
        //     locationRef.current.longitude = map.getCenter().getLng();
        //   }}
      >
        {/* <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} /> */}
        <MapMarker
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      </Map>
      {/* <CardContent></CardContent> */}
      {/* <CardActions> */}
      {/* {!isOwnMessage && status === "0" && ( */}
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
      {/* )} */}
      {/* </CardActions> */}
    </Card>
  );
};

export default SharedLocationBubble;
