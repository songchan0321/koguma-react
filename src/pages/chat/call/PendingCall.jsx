import React, { useContext, useEffect } from "react";
import { CALL_EVENT, SocketContext } from "../../../context/socket";
import { useLocation, useNavigate } from "react-router-dom";
import CalleePending from "../../../component/chat/call/pending/CalleePending";
import CallerPending from "../../../component/chat/call/pending/CallerPending";
const PendingCall = () => {
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  const navigator = useNavigate();
  const { roomId, isOwner, next } = state;
  const cancelBtnClickHandler = () => {
    console.log("calcel event");
    console.log(isOwner);
    console.log(state.targetMember);
    console.log(state.sourceMember);
    socket.emit(CALL_EVENT.CALL_CANCEL, {
      targetMemberId: isOwner ? state.targetMember.id : state.sourceMember.id,
    });
  };
  const acceptBtnClickHandler = () => {
    socket.emit(CALL_EVENT.ACCEPT, {
      sourceMemberId: state.sourceMember.id,
    });
    navigator("/chat/call/doing", {
      state: {
        roomId: roomId,
        next: next,
      },
    });
  };
  useEffect(() => {
    console.log("CALL CANCEL EVENT ON");
    socket.on(CALL_EVENT.CALL_CANCEL, () => {
      console.log("CALL CANCEL");
      navigator(state?.next ? state.next : "/product/list");
    });

    return () => {
      console.log("CALL CANCEL EVENT OFF");
      socket.off(CALL_EVENT.ACCEPT);
    };
  }, []);
  console.log("isOwner");
  console.log(isOwner);
  return isOwner ? (
    <CallerPending
      roomId={roomId}
      targetMember={state.targetMember}
      closeHandler={cancelBtnClickHandler}
    />
  ) : (
    <CalleePending
      roomId={roomId}
      sourceMember={state.sourceMember}
      clickHandler={acceptBtnClickHandler}
      closeHandler={cancelBtnClickHandler}
    />
  );
};

export default PendingCall;
