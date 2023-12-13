import React, { useContext, useLayoutEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Badge, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import { getAllUnreadCount, getUnreadCount } from "../../apis/api/chat";

// 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: "#D070FB", // 보라색으로 변경
    },
  },
});

const BottomBar = () => {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const [value, setValue] = useState(
    location.pathname.split("/")[1] === ""
      ? "product"
      : location.pathname.split("/")[1]
  );
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    socket.on(CHAT_EVENT.EVENT_BOTTOM_ALERT, (message) => {
      setCount((count) => count + 1);
    });
    (async () => {
      const data = await getAllUnreadCount();
      setCount(data);
    })();
    return () => {
      socket.off(CHAT_EVENT.EVENT_BOTTOM_ALERT);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="홈"
            value="product"
            icon={<HomeIcon sx={{ fontSize: "1.5rem" }} />}
            component={Link}
            to="/product/list"
          />
          <BottomNavigationAction
            label="동네생활"
            value="post"
            icon={<ArticleIcon sx={{ fontSize: "1.5rem" }} />}
            component={Link}
            to="/post/list"
          />
          <BottomNavigationAction
            label="모임"
            value="club"
            component={Link}
            to="/club/list"
            icon={<Diversity3Icon sx={{ fontSize: "1.5rem" }} />}
          />
          <BottomNavigationAction
            label="채팅"
            value="chat"
            icon={
              <Badge color="secondary" badgeContent={count} max={99}>
                <ChatBubbleIcon sx={{ fontSize: "1.5rem" }} />
              </Badge>
            }
            component={Link}
            to="/chat/list"
          />
          <BottomNavigationAction
            label="프로필"
            value="member"
            icon={<InsertEmoticonIcon sx={{ fontSize: "1.5rem" }} />}
            component={Link}
            to="/member/profile"
          />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default BottomBar;
