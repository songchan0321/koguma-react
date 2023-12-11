import { authInstance } from "../utils/instance";

const PAYMENT_API_URI = "/payment";
export const existPaymentAPI = async () => {
  try {
    const { data } = await authInstance.get(`${PAYMENT_API_URI}/exist`);
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

export const chargePointAPI = async (imp_uid, merchant_uid) => {
  try {
    const { data } = await authInstance.post(
      `${PAYMENT_API_URI}/check/charge`,
      JSON.stringify({
        imp_uid,
        merchant_uid,
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
