import { Avatar, Chip } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
const centerChipStyle = {
  position: "fixed",
  top: "20px", // 여기에서 조절하여 상단에 위치하도록 합니다.
  left: "50%",
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
      <Chip
        sx={{ zIndex: 500000, backgroundColor: "#D070FB", color: "white" }}
        // avatar={<Avatar alt="" src="/static/images/avatar/1.jpg" />}
        label={
          message.type === "LOCATION" ? "장소가 공유되었어요." : message.content
        }
        variant="outlined"
        onClick={() => navigator(`/chat/get/${message.roomId}`)}
        // onDelete={() => setIsVisible(false)} // 삭제 버튼 클릭 시 상태 업데이트
      />
    </animated.div>
  );
};

export default AlertAvator;
