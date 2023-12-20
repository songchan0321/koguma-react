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

export const chatRoomListBySellerAPI = async (productId) => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/list/${productId}`);
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

export const existAbsoluteChatRoomByProductAPI = async (productId) => {
  const { data } = await authInstance.get(
    `${CHAT_API_URI}/exist/absolute/${productId}`
  );
  return data.result;
};

export const existChatRoomByProductAPI = async (productId) => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/exist/${productId}`);
  return data.result;
};

export const existChatRoomByProductAndBuyerAPI = async (productId, buyerId) => {
  const { data } = await authInstance.get(
    `${CHAT_API_URI}/exist/${productId}/${buyerId}`
  );
  return data;
};
export const checkEnterRoomByMemberAPI = async (roomId, memberId) => {
  const { data } = await authInstance.get(
    `${CHAT_API_URI}/enter/check/${roomId}/${memberId}`
  );
  return data.result;
};

export const updateChatRoomBySuggestAPI = async (roomId, price) => {
  const { data } = await authInstance.post(
    `${CHAT_API_URI}/update/${roomId}`,
    JSON.stringify({
      price: `${price}`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const getChatRoomAPI = async (roomId) => {
  const { data } = await authInstance.get(`${CHAT_API_URI}/get/${roomId}`);
  return data;
};

export const addChatRoom = async (productId) => {
  const { data } = await authInstance.post(
    `${CHAT_API_URI}/add`,
    JSON.stringify({
      productId: `${productId}`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const addSoloChatRoom = async (productId) => {
  const { data } = await authInstance.post(
    `${CHAT_API_URI}/add/solo`,
    JSON.stringify({
      productId: `${productId}`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const addChatRoomBySuggest = async (
  productId,
  suggestedMemberId,
  price
) => {
  const { data } = await authInstance.post(
    `${CHAT_API_URI}/addFromSuggest`,
    {
      productId: `${productId}`,
      suggestedMemberId: `${suggestedMemberId}`,
      price: `${price}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const leaveChatRoomAPI = async (roomId) => {
  await authInstance.post(`${CHAT_API_URI}/leave/${roomId}`);
};

export const enterChatRoomAPI = async (roomId) => {
  const { data } = await authInstance.post(`${CHAT_API_URI}/enter/${roomId}`);
  return data;
};

export const getUnreadCount = async (roomId) => {
  try {
    const { data } = await authNodeInstance.get(`/unread/count/${roomId}`);
    return data.count;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUnreadCount = async () => {
  try {
    const { data } = await authNodeInstance.get(`/unread/count`);
    return data.count;
  } catch (err) {
    console.log(err);
  }
};

export const getLatestMessage = async (roomId) => {
  try {
    const { data } = await authNodeInstance.get(`/latestMessage/${roomId}`);
    console.log(data.latestMessage);
    return data.latestMessage;
  } catch (err) {
    console.log(err);
  }
};

export const getChatRoomByProductAndMember = async (productId, buyerId) => {
  try {
    const { data } = await authInstance.get(
      `${CHAT_API_URI}/get/${productId}/${buyerId}`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const countProductChatRoom = async (productId) => {
  try {
    const { data } = await authInstance.get(
      `${CHAT_API_URI}/count/${productId}`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
