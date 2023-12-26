export const chatRoomListService = (data, memberId) => {
  if (data) {
    return data.map((room) => {
      const memberCheck = room.productDTO.sellerDTO.id !== memberId;
      const nickname = memberCheck
        ? room.productDTO.sellerDTO.nickname
        : room.buyerDTO.nickname;
      const profileURL = memberCheck
        ? room.productDTO.sellerDTO.profileURL
        : room.buyerDTO.profileURL;
      const dong = room.productDTO.dong;
      room.latestMessage.content = truncatedText(
        room.latestMessage.content,
        25
      );
      const productURL = room.productDTO.imageDTO[0].url;
      return {
        id: room.id,
        nickname,
        profileURL,
        productURL,
        dong,
        count: room.count,
        latestMessage: room.latestMessage,
      };
    });
  } else {
    return [];
  }
};

const truncatedText = (longText, maxTextLength) => {
  return longText.length > maxTextLength
    ? longText.slice(0, maxTextLength) + "..." // 일정 길이 이상이면 생략 부호 추가
    : longText;
};
