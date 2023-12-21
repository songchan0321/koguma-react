import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Fragment,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import { Map } from "react-kakao-maps-sdk";
import MyLocationIcon from "@mui/icons-material/MyLocation";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddShareLocation = ({
  lat,
  lng,
  locationClickHandler,
  handleClose,
  open,
  roomId,
  product,
  sendTextMessageHandler,
}) => {
  const [locationState, setLocationState] = useState({
    center: {
      lat: lat,
      lng: lng,
    },
  });
  const [feedback, setFeedback] = useState(false);
  const locationRef = useRef({
    level: 4,
    // latitude: 37.49934209591508,
    // longitude: 127.02901006028125,
    latitude: lat,
    longitude: lng,
  });
  // const [location, setLocation] = useState({
  //   level: 2,
  //   latitude: 33.450701,
  //   longitude: 126.570667,
  // });
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
                <IconButton onClick={locationClickHandler}>
                  <MyLocationIcon />
                </IconButton>
              </Avatar>
            </div>
            {console.log("AddShareLocation render")}
            <Map // 지도를 표시할 Container
              center={{
                lat: lat,
                lng: lng,
              }}
              style={{
                position: "fixed",
                width: "100%",
                // overflow: "hidd",
                height: "100vh",
              }}
              isPanto={true}
              level={1} // 지도의 확대 레벨
              onCenterChanged={(map) => {
                locationRef.current.level = map.getLevel();
                locationRef.current.latitude = map.getCenter().getLat();
                locationRef.current.longitude = map.getCenter().getLng();
              }}
            ></Map>
          </>
        </List>
      </Dialog>
    </Fragment>
  );
};

export default AddShareLocation;
