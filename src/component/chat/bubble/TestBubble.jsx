import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  EVENTS,
  createAnswer,
  createOffer,
  getMedia,
} from "../../../apis/utils/media";

// 체팅방 아이디가 들어가야겠죠;
const roomName = 3;
const getMediaCaller = (myVideoRef, remoteVideoRef, pcRef, socketRef) => {
  //   getMedia(myVideoRef, remoteVideoRef, pcRef, socketRef);
};
const TestBubble = () => {
  const socketRef = useRef();
  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  useEffect(() => {
    socketRef.current = io("localhost:8000");
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    socketRef.current.on(EVENTS.ALL_USERS, (allUsers) => {
      //   if (allUsers.length > 0) createOffer(pcRef.current, socketRef.current);
    });

    socketRef.current.on(EVENTS.GET_OFFER, (sdp) => {
      console.log("recv offer");
      //   createAnswer(sdp, pcRef.current, socketRef.current);
    });

    socketRef.current.on(EVENTS.GET_ANSWER, (sdp) => {
      console.log("recv answer");
      if (!pcRef.current) return;
      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current.on(EVENTS.GET_CANDIDATE, async (candidate) => {
      if (pcRef.current) return;
      await pcRef.current.addIceCandidate(candidate);
    });

    socketRef.current.emit(EVENTS.JOIN_ROOM, {
      room: roomName,
    });

    // getMediaCaller(myVideoRef, remoteVideoRef, pcRef, socketRef);
    getMedia(myVideoRef, remoteVideoRef, pcRef, socketRef);
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);
  return (
    <div>
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={myVideoRef}
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default TestBubble;
