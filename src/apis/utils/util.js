export const isBuyerByChatroom = (chatRoom, member) => {
  return chatRoom.buyerDTO.id === member.id;
};

export const isBuyerByProdct = (product, member) => {
  return product.buyerDTO.id === member.id;
};
