import { useEffect, useRef, useState } from "react";
import { chatRoomListAPI } from "../../apis/api/chat";
import LoadingProgress from "../../component/common/LoadingProgress";
import { Divider, List } from "@mui/material";
import TopBar from "../../component/payment/TopBar";
import { getMemberAPI } from "../../apis/api/member";
import { chatRoomListService } from "../../apis/services/chat";
import ChatThumbnail from "../../component/chat/ChatThumbnail";

const ChatRoomList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  //   const [memberId, setMemberId] = useState(null);
  const memberId = useRef();
  useEffect(() => {
    (async () => {
      try {
        await getMemberAPI().then((data) => (memberId.current = data.id));
        await chatRoomListAPI()
          .then((data) => chatRoomListService(data, memberId.current))
          .then((data) => setRooms(data));
        // .then((data) => setRooms(data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return isLoading ? (
    <LoadingProgress />
  ) : (
    <>
      <TopBar>채팅</TopBar>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {rooms.map((room, idx) => {
          return <ChatThumbnail key={idx} room={room} />;
        })}
      </List>
    </>
  );
};

export default ChatRoomList;
