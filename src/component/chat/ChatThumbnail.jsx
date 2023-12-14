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
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {/* !!image 처리 필요 */}
          <Avatar alt="" src={room.imageId && "s"} />
        </ListItemAvatar>
        <ListItemText
          //   primary={room.nickname}
          secondary={
            <>
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {room.nickname}
                </Typography>
                &nbsp;&nbsp;&nbsp;
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body3"
                  fontSize="0.7rem"
                  color="text.disabled"
                >
                  {room.dong}&nbsp;&nbsp;&nbsp;
                  {formatTimeAgo(room.latestMessage.timestamp)}
                </Typography>
              </Fragment>
              <br />
              <Fragment>
                <div
                  //   variant="h6"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {room.latestMessage.content}
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
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </>
  );
};

export default ChatThumbnail;
