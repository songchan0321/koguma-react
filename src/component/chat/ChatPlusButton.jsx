import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Fragment, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PhotoIcon from "@mui/icons-material/Photo";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TodayIcon from "@mui/icons-material/Today";
const ChatPlusButton = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["송금하기", "송금요청하기"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {
                  [
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "#F3C73C" }}>
                      <AttachMoneyIcon sx={{ color: "#ffffff" }} />
                    </Avatar>,
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "#318F23" }}>
                      <CurrencyExchangeIcon sx={{ color: "#ffffff" }} />
                    </Avatar>,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["약속 잡기", "위치 공유", "이미지 업로드"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {
                  [
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "#C0392B" }}>
                      <TodayIcon sx={{ color: "#F5F5DC" }} />
                    </Avatar>,
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "#318F23" }}>
                      <LocationOnIcon sx={{ color: "#F5F5DC" }} />
                    </Avatar>,
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "gray" }}>
                      <PhotoIcon sx={{ color: "F5F5DC" }} />
                    </Avatar>,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key={"bottom"}>
        {/* <Button >{"bottom"}</Button> */}
        <IconButton
          onClick={toggleDrawer("bottom", true)}
          sx={{ p: "10px" }}
          aria-label="menu"
        >
          <AddIcon />
        </IconButton>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("bottom")}
        </Drawer>
      </Fragment>
    </div>
  );
};
export default ChatPlusButton;
