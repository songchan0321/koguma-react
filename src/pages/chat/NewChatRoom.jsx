import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAPI } from "../../apis/api/Product";
import ChatForm from "../../component/chat/ChatForm";
import { List, Typography } from "@mui/material";
import HorizontalScrollChips from "../../component/chat/HorizontalScrollChips";
import { addChatRoom } from "../../apis/api/chat";
import { CHAT_EVENT, SocketContext } from "../../context/socket";
import LoadingProgress from "../../component/common/LoadingProgress";

const NewChatRoom = () => {
  const socket = useContext(SocketContext);
  const navigator = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  const newSendTextMessageHandler = (text, product) => {
    (async () => {
      const data = await addChatRoom(product.id);
      await socket.emit(CHAT_EVENT.SEND_MESSAGE, {
        roomId: data.id,
        toId: product.sellerDTO.id,
        //   chatRoom.productDTO.sellerDTO.id === memberId
        //     ? chatRoom.buyerDTO.id
        //     : chatRoom.productDTO.sellerDTO.id,
        token: `${localStorage.getItem("token")}`,
        message: text,
      });
      navigator(`/chat/get/${data.id}`);
    })();
  };
  useEffect(() => {
    (async () => {
      await getProductAPI(productId).then((data) => setProduct(data));
    })();
  }, [productId]);
  return !product ? (
    <LoadingProgress />
  ) : (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <HorizontalScrollChips
        newSendTextMessageHandler={newSendTextMessageHandler}
        product={product}
      />

      <ChatForm
        newSendTextMessageHandler={newSendTextMessageHandler}
        product={product}
      />
    </List>
  );
};

export default NewChatRoom;
