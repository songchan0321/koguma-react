import {
  Avatar,
  Badge,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { formatTimeAgo } from "../../apis/utils/timestamp";
const ChatThumbnail = ({ room }) => {
  console.log(room);
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ padding: "1rem 0.3rem 1rem 1rem" }}
      >
        <ListItemAvatar>
          {/* !!image 처리 필요 */}
          <Avatar
            sx={{
              border: "solid 1px rgba(120, 120, 120, 0.5)",
              width: "2.8rem",
              height: "2.8rem",
            }}
            alt=""
            src={room?.profileURL}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <>
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {room.nickname}
                </Typography>
                &nbsp;&nbsp;&nbsp;
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  fontSize="0.8rem"
                  color="text.disabled"
                >
                  {room.dong}&nbsp;·&nbsp;
                  {formatTimeAgo(room.latestMessage.timestamp, true)}
                </Typography>
              </Fragment>
              <br />
              <Fragment>
                <div style={{ position: "relative", display: "inline-block" }}>
                  {room.latestMessage.type === "LOCATION"
                    ? "장소가 공유되었어요!"
                    : room.latestMessage.type === "PLAN"
                    ? "약속이 잡혔어요!"
                    : room.latestMessage.type === "TRANSFER"
                    ? "송금을 했어요!"
                    : room.latestMessage.type === "REQUEST"
                    ? "송금 요청을 했어요!"
                    : room.latestMessage.type === "IMAGE"
                    ? "이미지를 업로드 했어요!"
                    : room.latestMessage.type === "ALERT"
                    ? "채팅방 공지가 왔어요!"
                    : room.latestMessage.content}
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                  <Badge
                    color="warning"
                    badgeContent={room.count}
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                    }}
                  ></Badge>
                </div>
              </Fragment>
            </>
          }
        />
        <ListItemAvatar>
          <Avatar
            sx={{
              border: "solid 1px rgba(120, 120, 120, 0.5)",
              width: "2.8rem",
              height: "2.8rem",
            }}
            variant="rounded"
            alt=""
            src={room?.productURL}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default ChatThumbnail;
