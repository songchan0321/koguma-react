import { authInstance } from "../utils/instance";

const PAYMENT_API_URI = "/payment";
export const existPaymentAPI = async (memberId) => {
  try {
    const { data } = await authInstance.get(`${PAYMENT_API_URI}/exist`, {
      params: {
        memberId: memberId,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const checkAccountNameAPI = async (name, account, code) => {
  try {
    const { data } = await authInstance.post(
      `${PAYMENT_API_URI}/check/name`,
      JSON.stringify({
        name,
        account,
        code,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addPaymentAPI = async (memberId, account, bankName, password) => {
  try {
    const { data } = await authInstance.post(
      `${PAYMENT_API_URI}/add?memberId=${memberId}`,
      JSON.stringify({
        paymentAccount: account,
        paymentBank: bankName,
        paymentPw: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
// export const addPaymentAPI = authInstance.post(`${PAYMENT_API_URI}/add`, {})
