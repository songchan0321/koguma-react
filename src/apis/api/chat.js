import { authInstance } from "../utils/instance";

const CHAT_API_URI = "/chat";

export const chatRoomListAPI = async () => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/list`);
  return data;
};

export const getChatRoomAPI = async (roomId) => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/get/${roomId}`);
  return data;
};
