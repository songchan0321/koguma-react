import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { formatTimeTo12Hour } from "../../../apis/utils/timestamp";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getGeo } from "../../../apis/api/common";

const PlanBubble = ({ content, isOwnMessage }) => {
  const [location, planDate] = content.split(",");
  const [year, month, day, time] = planDate.split(".");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const onClickHandler = () => {
    window.open(
      `https://map.kakao.com/link/map/공유한 장소,${latitude},${longitude}`,
      "_blank"
    );
  };
  useLayoutEffect(() => {
    (async () => {
      await getGeo(location).then((data) => {
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      });
    })();
  }, []);
  return (
    <Card
      sx={{
        maxWidth: "12.5rem",
        ml: isOwnMessage ? "0" : "0.5rem",
        backgroundColor: "#F8F8FA",
      }}
    >
      {/* <CardMedia
      sx={{ height: "10rem", width: "12.5rem" }}
      image={`/chat/transfer.png`}
      title="green iguana"
    /> */}
      <CardContent sx={{ height: "5rem", width: "10.5rem" }}>
        <Typography gutterBottom variant="h6" component="div">
          {`약속을 만들었어요.`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          날짜: {`${year}년 ${month}월 ${day}일`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          시간: {`${formatTimeTo12Hour(time)}`}
        </Typography>
      </CardContent>
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

export default PlanBubble;
