import { useContext, useEffect, useRef, useState } from "react";
import { chatRoomListAPI, chatRoomListBySellerAPI } from "../../apis/api/chat";
import LoadingProgress from "../../component/common/LoadingProgress";
import { Divider, List, ListItemButton } from "@mui/material";
import TopBar from "../../component/payment/TopBar";
import { getMemberAPI } from "../../apis/api/member";
import { chatRoomListService } from "../../apis/services/chat";
import ChatThumbnail from "../../component/chat/ChatThumbnail";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BottomBar from "../../component/common/BottomBar";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import MarginEmpty from "../../component/payment/MarginEmpty";
import Back from "../../component/common/Back";

const ListChatRoom = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);
  const [rooms, setRooms] = useState([]);
  const navigator = useNavigate();
  //   const [memberId, setMemberId] = useState(null);
  const memberId = useRef();
  const [flag, setFlag] = useState(false);
  const changeAlert = (message) => {
    if (rooms.filter((room) => room.id === message.roomId).length === 0) {
      setFlag((flag) => !flag);
      return;
    }
    setRooms((rooms) => {
      const updatedChatRooms = rooms
        .map((room) =>
          room.id === message.roomId
            ? {
                ...room,
                count: room.count + 1,
                latestMessage: message,
              }
            : room
        )
        .sort(
          (a, b) =>
            new Date(b.latestMessage.timestamp) -
            new Date(a.latestMessage.timestamp)
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
    return () => {
      socket.off(CHAT_EVENT.EVENT_CHAT_LIST_ALERT);
    };
  });
  useEffect(() => {
    (async () => {
      try {
        await getMemberAPI().then((data) => (memberId.current = data.id));
        console.log("-------------------------21412853829758932758 9");
        console.log(productId);
        if (productId) {
          await chatRoomListBySellerAPI(productId)
            .then((data) => chatRoomListService(data, memberId.current))
            .then((data) =>
              setRooms(
                data.sort(
                  (a, b) =>
                    new Date(b.latestMessage.timestamp) -
                    new Date(a.latestMessage.timestamp)
                )
              )
            );
        } else {
          await chatRoomListAPI()
            .then((data) => chatRoomListService(data, memberId.current))
            .then((data) =>
              setRooms(
                data.sort(
                  (a, b) =>
                    new Date(b.latestMessage.timestamp) -
                    new Date(a.latestMessage.timestamp)
                )
              )
            );
        }
        // .then((data) => setRooms(data));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
    return () => {
      console.log("listChatRoom socket bye");
    };
  }, [flag]);
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
      {productId && <Back />}
      <TopBar>채팅</TopBar>
      <MarginEmpty />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {rooms.map((room, idx) => {
          console.log(room.id);
          return (
            room.latestMessage && (
              <div onClick={() => navigator(`/chat/get/${room.id}`)}>
                <ChatThumbnail key={idx} room={room} />
              </div>
            )
          );
        })}
      </List>
      <BottomBar />
      <MarginEmpty />
    </>
  );
};

export default ListChatRoom;
