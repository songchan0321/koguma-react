import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
const DoingCall = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  // if (!(state.roomId && state.isOwner && state.next)) {
  //   navigate("/product/list");
  // }
  const { roomId, next } = state;

  const socketRef = useRef();
  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  let stream;
  const [cam, setCam] = useState("environment");
  const getMedia = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      // video: true,
      video: {
        facingMode: cam == null ? "environment" : cam,
      },
      audio: true,
    });
    try {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("recv candidate");
          console.log(e.candidate);
          socketRef.current.emit("candidate", e.candidate, roomId);
        }
      };

      pcRef.current.ontrack = (e) => {
        console.log("track on");
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
      console.log("getMedia");
      console.log(roomId);
      socketRef.current.emit("join_room", {
        roomId: roomId,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const createOffer = async () => {
    console.log("create Offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      console.log(pcRef.current);
      socketRef.current.emit("offer", sdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };
  const createAnswer = async (sdp) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      await pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");

      console.log(pcRef.current);
      socketRef.current.emit("answer", answerSdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_CALL_URL);

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    socketRef.current.on("all_users", (allUsers) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on("getOffer", (sdp) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", (sdp) => {
      console.log("recv Answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current.on("getCandidate", async (candidate) => {
      if (!pcRef.current) {
        return;
      }
      console.log("get cand");
      await pcRef.current.addIceCandidate(candidate);
    });

    socketRef.current.on("cam change", () => {
      getMedia();
    });

    socketRef.current.on("exit room", () => {
      console.log("room exit");
      navigate(`${next}`);
    });

    // getMedia();
    // socketRef.current.emit("join_room", {
    //   room: roomName,
    // });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
      stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    getMedia();
  }, [cam]);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <video
        playsinline="true"
        id="remotevideo"
        style={{
          transform: "rotateY(180deg)",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      />
      <div
        style={{
          position: "fixed",
          top: "0.5rem",
          left: "0",
          width: "27%",
          height: "18%",
          borderRadius: "0.3rem",
        }}
      >
        <video
          playsinline="true"
          id="myvideo"
          style={{
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            border: "1px solid #adb5bd",
          }}
          // controls={true}
          muted={true}
          ref={myVideoRef}
          autoPlay
        />
      </div>
      <div
        style={{
          position: "fixed",
          top: "0.8rem",
          right: "0.8rem",
          // borderRadius: "0.3rem",
        }}
      >
        <Avatar
          sx={{ width: "1.8rem", height: "1.8rem", backgroundColor: "white" }}
        >
          <IconButton
            onClick={() => {
              setCam((prev) => (prev === "user" ? "environment" : "user"));
              socketRef.emit("cam change", { roomId: roomId });
            }}
          >
            <CameraswitchIcon
              sx={{
                width: "1.3rem",
                height: "1.3rem",
                color: "black",
                // backgroundColor: "gray",
              }}
            />
          </IconButton>
        </Avatar>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "3rem", // 원하는 만큼 조절
          left: 0,
          // right: 0,
          width: "100%",
          zIndex: 3000,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar
            sx={{ width: "4rem", height: "4rem", backgroundColor: "red" }}
          >
            <IconButton
              onClick={() =>
                socketRef.current.emit("exit room", { roomId: roomId })
              }
            >
              <CallEndIcon sx={{ color: "#adb5bd" }} />
            </IconButton>
          </Avatar>
          <span style={{ fontSize: "0.8rem", color: "#adb5bd" }}>
            <b>종료</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoingCall;
