import { authInstance, authNodeInstance } from "../utils/instance";

const CHAT_API_URI = "/chat";

export const chatRoomListAPI = async () => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/list`);
  const results = await Promise.all(
    data.map(async (room) => {
      return {
        ...room,
        count: await getUnreadCount(room.id),
        latestMessage: await getLatestMessage(room.id),
      };
    })
  );
  return results;
};

export const getChatRoomAPI = async (roomId) => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/get/${roomId}`);
  return data;
};

export const addChatRoom = async (productId) => {
  const { data } = await authInstance.post(
    `${CHAT_API_URI}/add`,
    JSON.stringify({
      productId,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const getUnreadCount = async (roomId) => {
  const { data } = await authNodeInstance.get(`/unread/count/${roomId}`);
  return data.count;
};

export const getAllUnreadCount = async () => {
  const { data } = await authNodeInstance.get(`/unread/count`);
  return data.count;
};

export const getLatestMessage = async (roomId) => {
  const { data } = await authNodeInstance.get(`/latestMessage/${roomId}`);
  console.log(data.latestMessage);
  return data.latestMessage;
};
