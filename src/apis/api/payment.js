import { authInstance } from "../utils/instance";

const PAYMENT_API_URI = "/payment";

export const existPaymentAPI = async () => {
  try {
    const { data } = await authInstance.get(`${PAYMENT_API_URI}/exist`, {
      params: {
        memberId: 3,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
