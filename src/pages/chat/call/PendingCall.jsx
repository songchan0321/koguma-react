import React, { useContext, useEffect, useRef, useState } from "react";
import { CALL_EVENT, SocketContext } from "../../../context/socket";
import { useLocation, useNavigate } from "react-router-dom";
import CalleePending from "../../../component/chat/call/pending/CalleePending";
import CallerPending from "../../../component/chat/call/pending/CallerPending";
import { getMemberAPI } from "../../../apis/api/member";
const PendingCall = () => {
  const socket = useContext(SocketContext);
  const { state } = useLocation();
  const navigator = useNavigate();
  //   const [member, setMember] = useState();
  //   if (!(state.roomId && state.isOwner != null)) {
  //     navigator(state?.next ? state.next : "/product/list");
  //   }
  const { roomId, isOwner, next } = state;
  //   if (isOwner && !state.targetMember) {
  //     navigator(state?.next ? state.next : "/product/list");
  //   }
  //   if (!isOwner && !state.sourceMember) {
  //     navigator(state?.next ? state.next : "/product/list");
  //   }
  const cancelBtnClickHandler = () => {
    console.log("calcel event");
    console.log(isOwner);
    console.log(state.targetMember);
    console.log(state.sourceMember);
    socket.emit(CALL_EVENT.CALL_CANCEL, {
      targetMemberId: isOwner ? state.targetMember.id : state.sourceMember.id,
      //   targetMemberId: state?.targetMember ? state.targetMember.id : member.id,
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
    // (async () => {
    //   await getMemberAPI().then((data) => setMember(data));
    // })();
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
