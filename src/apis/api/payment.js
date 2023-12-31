import { authInstance } from "../utils/instance";

const PAYMENT_API_URI = "/payment";
export const existPaymentAPI = async () => {
  const { data } = await authInstance.get(`${PAYMENT_API_URI}/exist`);
  return data;
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

export const checkPaymentPasswordAPI = async (password) => {
  const { data } = await authInstance.post(
    `${PAYMENT_API_URI}/checkPw`,
    JSON.stringify({
      paymentPw: password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
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

export const requestRefundPointAPI = async (point) => {
  const { data } = await authInstance.post(
    `${PAYMENT_API_URI}/request/refund`,
    {
      point: `${point}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const transferPointAPI = async (point, member, chatRoom) => {
  const { data } = await authInstance.post(
    `${PAYMENT_API_URI}/transfer`,
    JSON.stringify({
      point: `${point}`,
      receiverMemberId: `${member.id}`,
      chatroomId: `${chatRoom.id}`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const deletePaymentAPI = async (password) => {
  const { data } = await authInstance.post(
    `${PAYMENT_API_URI}/delete`,
    JSON.stringify({
      paymentPw: password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
export const listPaymentHistoryAPI = async (type) => {
  const { data } = await authInstance.get(
    `${PAYMENT_API_URI}/history/list${type && "?type=" + type}`
  );
  return data;
};
