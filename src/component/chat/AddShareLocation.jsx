import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import LoadingProgress from "../common/LoadingProgress";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MarginEmpty from "../payment/MarginEmpty";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddShareLocation = ({
  handleClose,
  open,
  roomId,
  product,
  sendTextMessageHandler,
}) => {
  const locationRef = useRef({
    level: 4,
    latitude: 37.49934209591508,
    longitude: 127.02901006028125,
    // latitude: 32.49934209591508,
    // longitude: 122.02901006028125,
  });
  // const [location, setLocation] = useState({
  //   level: 2,
  //   latitude: 33.450701,
  //   longitude: 126.570667,
  // });
  useLayoutEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(locationRef.current.latitude);
          console.log(locationRef.current.longitude);
          locationRef.current.latitude = pos.coords.latitude;
          locationRef.current.longitude = pos.coords.longitude;
          // console.log(locationRef.current.latitude);
          // console.log(locationRef.current.longitude);
        },
        (err) => alert("위치 권한이 없어요!"),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, [open]);
  const getCoordinates = () => {
    sendTextMessageHandler({
      text: `${locationRef.current.latitude},${locationRef.current.longitude}`,
      type: "LOCATION",
    });
    handleClose();
  };
  return (
    <Fragment>
      {console.log("render")}
      <Dialog
        sx={{ zIndex: 2000 }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ background: "#D070FB" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 14, flex: 1 }} variant="h6" component="div">
              장소공유
            </Typography>
            <Button autoFocus color="inherit" onClick={getCoordinates}>
              전송
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <>
            <div
              style={{
                zIndex: 2000,
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <PlaceIcon
                sx={{ fontSize: "3.5rem" }}
                style={{ color: "#D070FB" }}
              />
            </div>
            <div
              style={{
                zIndex: 2000,
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
                // transform: "translate(-50%, -50%)",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: "3.5rem",
                  height: "3.5rem",
                }}
              >
                <MyLocationIcon />
              </Avatar>
            </div>
            {console.log(locationRef.current)}

            <Map // 지도를 표시할 Container
              center={{
                // 지도의 중심좌표
                lat: locationRef.current.latitude,
                lng: locationRef.current.longitude,
              }}
              style={{
                position: "fixed",
                width: "100%",
                // overflow: "hidd",
                height: "100vh",
              }}
              level={1} // 지도의 확대 레벨
              onCenterChanged={(map) => {
                locationRef.current.level = map.getLevel();
                locationRef.current.latitude = map.getCenter().getLat();
                locationRef.current.longitude = map.getCenter().getLng();
              }}
            >
              {/* <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} /> */}
              {/* <MapMarker
                position={{
                  lat: locationRef.current.latitude,
                  lng: locationRef.current.longitude,
                }}
              /> */}
            </Map>
            {/* <Button onClick={() => console.log(location.current)}>1</Button> */}
          </>
        </List>
      </Dialog>
    </Fragment>
  );
};

export default AddShareLocation;
