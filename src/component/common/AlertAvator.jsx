import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
const centerChipStyle = {
  position: "fixed",
  top: "20px", // 여기에서 조절하여 상단에 위치하도록 합니다.
  left: "50%",
  zIndex: 10000,
  transform: "translateX(-50%)",
};

const AlertAvator = ({ message }) => {
  // react-spring을 사용하여 애니메이션 효과 추가
  const navigator = useNavigate();
  const animation = useSpring({
    opacity: Object.keys(message).length > 0 ? 1 : 0,
    transform:
      Object.keys(message).length > 0
        ? "translate(-50%, -50%)"
        : "translate(-50%, -150%)",
  });

  //   return (
  //     <div style={centerChipStyle}>
  //       <Chip
  //         sx={{ zIndex: 1000, backgroundColor: "#D070FB", color: "white" }}
  //         avatar={<Avatar alt="" src="/static/images/avatar/1.jpg" />}
  //         label={message.content}
  //         variant="outlined"
  //       />
  //     </div>
  //   );
  return (
    <animated.div style={{ ...centerChipStyle, ...animation }}>
      {console.log("avator rendering")}
      <Chip
        sx={{ backgroundColor: "#D070FB", color: "white" }}
        // avatar={<Avatar alt="" src="/static/images/avatar/1.jpg" />}
        label={
          Object.keys(message).length > 0 &&
          "새로운 메시지 : " +
            (message.type === "LOCATION"
              ? "장소가 공유되었어요!"
              : message.type === "PLAN"
              ? "약속이 잡혔어요!"
              : message.type === "IMAGE"
              ? "이미지를 업로드 했어요!"
              : message.type === "TRANSFER"
              ? "송금을 했어요!"
              : message.type === "REQUEST"
              ? "송금 요청을 했어요!"
              : message.type === "ALERT"
              ? "채팅방 공지가 왔어요!"
              : truncatedText(message.content, 15))
        }
        variant="outlined"
        onClick={() => navigator(`/chat/get/${message.roomId}`)}
        // onDelete={() => setIsVisible(false)} // 삭제 버튼 클릭 시 상태 업데이트
      />
    </animated.div>
  );
};

const truncatedText = (longText, maxTextLength) => {
  return longText && longText.length > maxTextLength
    ? longText.slice(0, maxTextLength) + "..." // 일정 길이 이상이면 생략 부호 추가
    : longText;
};

export default AlertAvator;
