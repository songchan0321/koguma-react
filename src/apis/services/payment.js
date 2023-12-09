export const getPaymentAPIService = (data) => {
  const { paymentAccount, paymentBank, paymentBalance } = data;
  return {
    account: paymentAccount,
    bank: paymentBank,
    balance: Number(paymentBalance).toLocaleString("ko-KR") + "원",
  };
};
