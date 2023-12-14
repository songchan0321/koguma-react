import {
  AppBar,
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
  useRef,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import LoadingProgress from "../common/LoadingProgress";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddShareLocation = ({ handleClose, open, roomId, product }) => {
  const [level, setLevel] = useState(3);
  const mapRef = useRef();
  const [latitude, setLatitude] = useState(33.5563);
  const [longitude, setLogitude] = useState(126.79581);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLogitude(pos.coords.longitude);
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
    socket.emit(CHAT_EVENT.SEND_MESSAGE, {
      roomId: roomId,
      type: "LOCATION",
      message: `${latitude},${longitude}`,
      token: `${localStorage.getItem("token")}`,
    });

    handleClose();
  };
  return (
    <Fragment>
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
          {console.log(`11 ${open}`)}
          <Map
            center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
            style={{ width: "100%", height: "60vh" }} // 지도 크기
            level={level} // 지도 확대 레벨
            ref={mapRef}
          >
            <MapMarker position={{ lat: latitude, lng: longitude }} />
            <button onClick={() => setLevel(level + 1)}>-</button>
            <button onClick={() => setLevel(level - 1)}>+</button>
          </Map>
          <ListItem button>
            {/* <ListItemText primary="Phone ringtone" secondary="Titania" /> */}
          </ListItem>
          {/* <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem> */}
        </List>
      </Dialog>
    </Fragment>
  );
};

export default AddShareLocation;
