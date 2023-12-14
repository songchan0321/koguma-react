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
      JSON.stringify(product),
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

export const getProductAPI = async (productId) => {
  const { data } = await authInstance.get(
    `${PRODUCT_API_URI}/get/${productId}`
  );
  return data;
};
export const ListProductAPI = async (page, keyword) => {
  try {
    const response = await authInstance.get(
      `${PRODUCT_API_URI}/list?keyword=${keyword || ""}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const ListProductHIAPI = async (page, keyword) => {
  try {
    const response = await authInstance.get(
      `${PRODUCT_API_URI}/list/hi?page=${page}&keyword=${keyword || ""}`
    );
    console.log(response);
    return {
      response,
    };
  } catch (err) {
    console.log(err);
  }
};
