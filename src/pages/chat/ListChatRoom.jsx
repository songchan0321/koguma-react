import { useContext, useEffect, useRef, useState } from "react";
import { chatRoomListAPI } from "../../apis/api/chat";
import LoadingProgress from "../../component/common/LoadingProgress";
import { Divider, List, ListItemButton } from "@mui/material";
import TopBar from "../../component/payment/TopBar";
import { getMemberAPI } from "../../apis/api/member";
import { chatRoomListService } from "../../apis/services/chat";
import ChatThumbnail from "../../component/chat/ChatThumbnail";
import { useNavigate } from "react-router-dom";
import BottomBar from "../../component/common/BottomBar";
import { CHAT_EVENT, SocketContext } from "../../context/socket";

const ListChatRoom = () => {
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);
  const [rooms, setRooms] = useState([]);
  const navigator = useNavigate();
  //   const [memberId, setMemberId] = useState(null);
  const memberId = useRef();
  const changeAlert = (message) => {
    setRooms((rooms) => {
      const updatedChatRooms = rooms.map((room) =>
        room.id === message.roomId
          ? {
              ...room,
              count: room.count + 1,
              latestMessage: message,
            }
          : room
      );
      return updatedChatRooms;
    });
    // console.log(rooms);
    // const updateRoom = rooms.find((item) => item.id === roomId);
    // 메시지 타입 체크해야함
    // updateRoom.content = message.content;
    // const newRooms = [
    //   updateRoom,
    //   ...rooms.filter((room) => room.id !== roomId),
    // ];
    // setRooms(newRooms);
  };
  useEffect(() => {
    socket.on(CHAT_EVENT.EVENT_CHAT_LIST_ALERT, (message) => {
      changeAlert(message);
    });
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
    return () => {
      console.log("listChatRoom socket bye");
      socket.off(CHAT_EVENT.EVENT_CHAT_LIST_ALERT);
    };
  }, []);
  // useEffect(() => {
  //   if (Object.keys(rooms).length > 0) {

  //   }
  // }, [rooms]);
  return isLoading ? (
    <>
      <LoadingProgress />
      <BottomBar />
    </>
  ) : (
    <>
      <TopBar>채팅</TopBar>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {rooms.map((room, idx) => {
          console.log(room.id);
          return (
            <div onClick={() => navigator(`/chat/get/${room.id}`)}>
              <ChatThumbnail key={idx} room={room} />
            </div>
          );
        })}
      </List>
      <BottomBar />
    </>
  );
};

export default ListChatRoom;
