export const formatMoney = (amount) => {
  if (typeof amount !== "string" && typeof amount !== "number") {
    return "";
  }

  const amountString = typeof amount === "string" ? amount : amount.toString();

  return amountString.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
