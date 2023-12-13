export const formatMoney = (amount) => {
  if (typeof amount !== "string") {
    return "";
  }

  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
