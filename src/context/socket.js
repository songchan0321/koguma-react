import { createContext } from "react";
import { io } from "socket.io-client";
const SOCKET_URL = process.env.REACT_APP_CHAT_URL;

export const socket = io.connect(SOCKET_URL);
export const SocketContext = createContext();

export const CHAT_EVENT = {
  FIRST_CONNECT: "first connect",
  SEND_MESSAGE: "send message",
  RECEIVED_MESSAGE: "received message",
  MESSAGE_LIST: "message list",
  JOIN_ROOM: "join room",
  LEAVE_ROOM: "leave room",
  IS_WRITING: "is writing",
  EVENT_CHAT_LIST_ALERT: "event alert1",
  EVENT_BOTTOM_ALERT: "event alert2",
  NEW_MESSAGE: "new message",
};
