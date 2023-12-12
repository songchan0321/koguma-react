import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
const ChatThumbnail = ({ room }) => {
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
                  {room.dong}
                </Typography>
              </Fragment>
              <br />
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  메시지 내용
                </Typography>
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
