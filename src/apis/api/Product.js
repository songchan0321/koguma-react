import { authInstance } from "../utils/instance";

const PRODUCT_API_URI = "/product";
export const memberchecAPI = async () => {
  try {
    const { data } = await authInstance.get(`${PRODUCT_API_URI}/member`, {});
    return data;
  } catch (err) {
    throw err;
  }
};

export const addProductAPI = async (product) => {
  try {
    const response = await authInstance.post(
      `${PRODUCT_API_URI}/new`,
      product,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
