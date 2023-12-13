import { getUnreadCount } from "../api/chat";
import { authInstance } from "../utils/instance";

export const chatRoomListService = (data, memberId) => {
  if (data) {
    return data.map((room) => {
      //   const count = await getUnreadCount(room.id);
      const memberCheck = room.productDTO.sellerDTO.id !== memberId;
      const nickname = memberCheck
        ? room.productDTO.sellerDTO.nickname
        : room.buyerDTO.nickname;
      const imageId = memberCheck
        ? room.productDTO.sellerDTO.imageId
        : room.buyerDTO.imageId;
      const dong = room.productDTO.dong;
      return {
        id: room.id,
        nickname,
        imageId,
        dong,
        count: room.count,
        latestMessage: room.latestMessage,
      };
    });
  } else {
    return [];
  }
};
