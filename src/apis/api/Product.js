import { authInstance } from "../utils/instance";

const PAYMENT_API_URI = "/product";
export const memberchecAPI = async () => {
  try {
    const { data } = await authInstance.get(`${PAYMENT_API_URI}/member`, {
    });
    return data;
  } catch (err) {
    throw err;
  }
};