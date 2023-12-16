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
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TodayIcon from "@mui/icons-material/Today";
import AddShareLocation from "./AddShareLocation";
import AddPlan from "./AddPlan";
import { useNavigate } from "react-router-dom";
import RequestTransferForm from "./RequstTransferForm";
import LeaveCheck from "./LeaveCheck";
const ChatPlusButton = ({ roomId, product }) => {
  const navigator = useNavigate();
  const [state, setState] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const handleLocationModalClickOpen = () => {
    setLocationModalOpen(true);
  };

  const handleLocationModalClose = () => {
    setLocationModalOpen(false);
  };
  const handlePlanModalClickOpen = () => {
    setPlanModalOpen(true);
  };

  const handlePlanModalClose = () => {
    setPlanModalOpen(false);
  };
  const handleRequestModalClickOpen = () => {
    setRequestModalOpen(true);
  };

  const handleRequestModalClose = (pointResetHandler) => {
    pointResetHandler();
    setRequestModalOpen(false);
  };

  const handleLeaveModalClickOpen = () => {
    setLeaveModalOpen(true);
  };

  const handleLeaveModalClose = () => {
    setLeaveModalOpen(false);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["송금하기", "송금요청하기"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {
                  [
                    <Avatar
                      sx={{ width: 34, height: 34, bgcolor: "#F3C73C" }}
                      onClick={() =>
                        navigator("/payment/transfer", {
                          state: { roomId: roomId },
                        })
                      }
                    >
                      <AttachMoneyIcon sx={{ color: "#ffffff" }} />
                    </Avatar>,
                    <Avatar
                      sx={{ width: 34, height: 34, bgcolor: "#318F23" }}
                      onClick={handleRequestModalClickOpen}
                    >
                      <CurrencyExchangeIcon sx={{ color: "#ffffff" }} />
                    </Avatar>,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText
                primary={text}
                onClick={
                  [
                    () =>
                      navigator("/payment/transfer", {
                        state: { roomId: roomId },
                      }),
                    handleRequestModalClickOpen,
                  ][index]
                }
              />
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
                    <Avatar
                      sx={{ width: 34, height: 34, bgcolor: "#C0392B" }}
                      onClick={handlePlanModalClickOpen}
                    >
                      <TodayIcon sx={{ color: "#F5F5DC" }} />
                    </Avatar>,
                    <Avatar
                      sx={{ width: 34, height: 34, bgcolor: "#318F23" }}
                      onClick={handleLocationModalClickOpen}
                    >
                      <LocationOnIcon sx={{ color: "#F5F5DC" }} />
                    </Avatar>,
                    <Avatar sx={{ width: 34, height: 34, bgcolor: "gray" }}>
                      <PhotoIcon sx={{ color: "F5F5DC" }} />
                    </Avatar>,
                  ][index]
                }
              </ListItemIcon>
              <ListItemText
                onClick={
                  [handlePlanModalClickOpen, handleLocationModalClickOpen][
                    index
                  ]
                }
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {
                  <Avatar
                    sx={{ width: 34, height: 34, bgcolor: "#C0392B" }}
                    onClick={handleLeaveModalClickOpen}
                  >
                    <LogoutIcon sx={{ color: "#F5F5DC" }} />
                  </Avatar>
                }
              </ListItemIcon>
              <ListItemText
                onClick={handleLeaveModalClickOpen}
                primary={"채팅방 나가기"}
              />
            </ListItemButton>
          </ListItem>
        }
      </List>
    </Box>
  );

  return (
    <div>
      <Fragment key={"bottom"}>
        {/* <Button >{"bottom"}</Button> */}
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ p: "10px" }}
          aria-label="menu"
        >
          <AddIcon />
        </IconButton>
        <Drawer anchor={"bottom"} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <AddShareLocation
          roomId={roomId}
          product={product}
          open={locationModalOpen}
          handleClose={handleLocationModalClose}
        />
        <AddPlan
          roomId={roomId}
          open={planModalOpen}
          handleClose={handlePlanModalClose}
        />
        <RequestTransferForm
          open={requestModalOpen}
          handleClose={handleRequestModalClose}
        />
        <LeaveCheck
          roomId={roomId}
          open={leaveModalOpen}
          handleClose={handleLeaveModalClose}
        />
      </Fragment>
    </div>
  );
};
export default ChatPlusButton;
