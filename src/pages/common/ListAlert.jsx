import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  styled,
} from "@mui/material";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArticleIcon from "@mui/icons-material/Article";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import { useEffect, useRef, useState } from "react";
import Back from "../../component/common/Back";
import TopBar from "../../component/payment/TopBar";
import MarginEmpty from "../../component/payment/MarginEmpty";
import {
  listAlertAPI,
  readAlertAPI,
  readAlertAllAPI,
} from "../../apis/api/alert";
import LoadingProgress from "../../component/common/LoadingProgress";
import { formatTimeAgo } from "../../apis/utils/timestamp";
import { useNavigate } from "react-router-dom";
import ListAlertSkeleton from "../../component/common/ListAlertSkeleton";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const dummy = [
  {
    id: "1",
    title: "회원",
    content: "~님이 팔로잉을 했어요!",
    url: "",
    regDate: "",
  },
  {
    id: "2",
    title: "채팅",
    content: "~님이 채팅을 시작했어요!",
    url: "",
    regDate: "",
  },
  {
    id: "3",
    title: "상품",
    content: "~님이 찜하기를 했어요!",
    url: "",
    regDate: "",
  },
  {
    id: "4",
    title: "동네생활",
    content: "~님이 좋아요를 했어요!",
    url: "",
    regDate: "",
  },
  {
    id: "5",
    title: "모임",
    content: "~님이 만남을 생성했어요!",
    url: "",
    regDate: "",
  },
  {
    id: "6",
    title: "거래",
    content: "~님이 송금을 했어요!",
    url: "",
    regDate: "",
  },
];
const icon = {
  회원: <PersonAddIcon />,
  동네생활: <ArticleIcon />,
  모임: <Diversity3Icon />,
  채팅: <ChatBubbleTwoToneIcon />,
  상품: <ChatBubbleTwoToneIcon />,
  거래: <PaidTwoToneIcon />,
};
const ListAlert = () => {
  const navigator = useNavigate();
  const [alerts, setAlerts] = useState();
  const listIntervalRef = useRef();
  const navigateClickHandler = (alertId, url) => {
    (async () => {
      readAlertAPI(alertId);
    })();
    navigator(url);
  };
  const readClickHandler = (event, alertId) => {
    event.stopPropagation();
    (async () => {
      await readAlertAPI(alertId)
        .then(listAlertAPI)
        .then((data) => setAlerts(data));
    })();
  };
  const readAllClickHandler = () => {
    (async () => {
      await readAlertAllAPI()
        .then(listAlertAPI)
        .then((data) => setAlerts(data));
    })();
  };
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        await listAlertAPI()
          .then(setAlerts)
          .catch((err) => alert(err));
      })();
    }, 1500);
    listIntervalRef.current = setInterval(() => {
      (async () => {
        await listAlertAPI()
          .then(setAlerts)
          .catch((err) => alert(err));
      })();
    }, 10 * 1000);
    clearInterval(listIntervalRef.current);
    return () => clearInterval(listIntervalRef.current);
  }, []);
  return (
    <Grid item xs={12} md={6}>
      <Back />
      <TopBar>알림</TopBar>
      <MarginEmpty />

      <Demo>
        <List dense={false}>
          {!alerts ? (
            <ListAlertSkeleton />
          ) : (
            <>
              {alerts.length > 0 && (
                <Button
                  sx={{
                    position: "fixed",
                    top: "0.7rem",
                    right: 0,
                    zIndex: 1100,
                  }}
                  onClick={readAllClickHandler}
                >
                  모두 읽음 처리
                </Button>
              )}

              {/* {dummy.map((alertObject) => {
                return (
                  <>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => alert("읽음 처리")}
                        >
                          <MarkChatReadIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#D070FB" }}>
                          {icon[alertObject.title]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={alertObject.content}
                        secondary={"3일전"}
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              })} */}
              <ListItem></ListItem>
              {alerts.map((alertObject) => {
                return (
                  <>
                    <ListItem
                      // 클릭 시 읽음 처리
                      onClick={() =>
                        navigateClickHandler(alertObject.id, alertObject.url)
                      }
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={(e) => readClickHandler(e, alertObject.id)}
                        >
                          <MarkChatReadIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#D070FB" }}>
                          {icon[alertObject.title]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={alertObject.content}
                        secondary={formatTimeAgo(alertObject.regDate)}
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </>
          )}
        </List>
      </Demo>
    </Grid>
  );
};

export default ListAlert;
