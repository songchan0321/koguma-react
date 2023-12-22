// myVideo: HTMLVideoElement Type

// 체팅방 아이디가 들어가야겠죠;
const roomName = 3;

export const EVENTS = {
  CANDIDATE: "candidate",
  OFFER: "offer",
  ANSWER: "answer",
  ALL_USERS: "all users",
  GET_OFFER: "get offer",
  GET_ANSWER: "get answer",
  GET_CANDIDATE: "get candidate",
  JOIN_ROOM: "join room",
  USER_EXIT: "user exit",
};
export const getMedia = async (myVideo, remoteVideo, pc, socket) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (myVideo) {
      myVideo.srcObject = stream;
    }
    if (!(pc && socket)) {
      return;
    }
    stream.getTracks().forEach((track) => {
      if (!pc) {
        return;
      }
      pc.addTrack(track, stream);
    });
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        if (!socket) return;
        console.log("candidate 받음");
        socket.emit(EVENTS.CANDIDATE, e.candidate, roomName);
      }
    };
    pc.ontrack = (e) => {
      if (remoteVideo.current) {
        remoteVideo.srcObject = e.streams[0];
      }
    };
  } catch (err) {
    console.error(err);
  }
};

export const createOffer = async (pc, socket) => {
  console.log("45");
  console.log("create Offer");
  if (!(pc && socket)) return;
  try {
    const sdp = await pc.createOffer();
    pc.setLocalDescription(sdp);
    console.log("50");
    console.log("send offer");
    socket.emit(EVENTS.OFFER, sdp, roomName);
  } catch (e) {
    console.error(e);
  }
};

export const createAnswer = async (sdp, pc, socket) => {
  console.log("61");
  console.log("create Answer");
  if (!(pc && socket)) return;
  try {
    pc.setRemoteDescription(sdp);
    const answerSdp = await pc.createAnswer();
    pc.setLocalDescription(answerSdp);
    pc.setLocalDescription(sdp);
    console.log("50");
    console.log("send answer");
    socket.emit(EVENTS.ANSWER, sdp, roomName);
  } catch (e) {
    console.error(e);
  }
};
