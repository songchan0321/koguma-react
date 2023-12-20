import { Alert, AlertTitle } from "@mui/material";
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
export const ListProductAPI = async (keyword) => {
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

export const validProductAPI = async (productId) => {
  const { data } = await authInstance.get(
    `${PRODUCT_API_URI}/valid/${productId}`
  );
  return data;
};

export const addSuggestPriceAPI = async (suggest) => {
  try {
    console.log(suggest);
    const response = await authInstance.post(
      `${PRODUCT_API_URI}/suggest`,
      JSON.stringify(suggest),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    // alert(err.response.data.content);
    console.log(err);
  }
};
export const listSuggestPriceAPI = async (productId) => {
  const { data } = await authInstance.get(
    `${PRODUCT_API_URI}/suggest/list/${productId}`
  );
  return data;
};

export const listProductBySaleAPI = async (type) => {
  try {
    const response = await authInstance.get(
      `${PRODUCT_API_URI}/sale/list?type=${type}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const listProductByBuyAPI = async () => {
  const { data } = await authInstance.get(`${PRODUCT_API_URI}/buy/list`);
  console.log(data);
  const results = await Promise.all(
    data.map(async (product) => {
      return {
        ...product,
        reviewId: await getOppReviewIdAPI(product),
        myReviewId: await getMyReviewIdAPI(product),
      };
    })
  );
  console.log(results);
  return results;
};
export const listProductBySaledAPI = async () => {
  const { data } = await authInstance.get(
    `${PRODUCT_API_URI}/sale/list?type=SALED`
  );
  console.log(data);
  const results = await Promise.all(
    data.map(async (product) => {
      return {
        ...product,
        reviewId: await getOppReviewIdAPI(product),
        myReviewId: await getMyReviewIdAPI(product),
      };
    })
  );
  console.log(results);
  return results;
};

// export const listProductBySaleAPI = async (type) => {
//   try {
//     const response = await authInstance.get(
//       `${PRODUCT_API_URI}/sale/list?type=${type}`
//     );
//     console.log(response);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };
// export const listProductByBuyAPI = async () => {
//   try {
//     const response = await authInstance.get(`${PRODUCT_API_URI}/buy/list`);
//     console.log(response);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const updateTradeStateAPI = async (productId, type) => {
  try {
    const response = await authInstance.put(
      `${PRODUCT_API_URI}/tradestate?productId=${productId}&type=${type}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const updateTradeStateSaledAPI = async (productId, buyerId, type) => {
  try {
    const response = await authInstance.put(
      `${PRODUCT_API_URI}/tradestate?productId=${productId}&buyerId=${buyerId}&type=${type}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const raiseProductAPI = async (productId) => {
  try {
    const response = await authInstance.post(
      `${PRODUCT_API_URI}/raise/${productId}`
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getProductLikeAPI = async (productId) => {
  try {
    const { data } = await authInstance.get(
      `${PRODUCT_API_URI}/get/like/${productId}`
    );
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
export const getProductLikeListAPI = async () => {
  try {
    const response = await authInstance.get(`${PRODUCT_API_URI}/list/like`);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addProductLikeAPI = async (productId) => {
  try {
    const response = await authInstance.post(
      `${PRODUCT_API_URI}/like/${productId}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductLikeAPI = async (productId) => {
  try {
    const { data } = await authInstance.delete(
      `${PRODUCT_API_URI}/like/${productId}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductAPI = async (productId) => {
  try {
    const { data } = await authInstance.delete(
      `${PRODUCT_API_URI}/delete/${productId}`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const addReviewAPI = async (reviewDTO) => {
  const { data } = await authInstance.post(
    `/review/new`,
    JSON.stringify(reviewDTO),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(data);
  return data;
};
export const getReviewAPI = async (reviewId) => {
  // type = true  판매자가 구매자에게 리뷰쓴거 확인
  // type = false 구매자가 판매자에게 리뷰쓴거 확인

  const { data } = await authInstance.get(`/review/get/${reviewId}`);
  console.log(data.reviewDTO.productDTO);
  const results = await Promise.all([
    data,
    getOppReviewIdAPI(data.reviewDTO.productDTO),
    getMyReviewIdAPI(data.reviewDTO.productDTO),
  ]);

  return { ...results[0], oppReviewId: results[1], myReviewId: results[2] };
};

export const getOppReviewIdAPI = async (product) => {
  try {
    const { data } = await authInstance.post(
      `/review/get/opp/reviewid`,
      JSON.stringify(product),
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
export const getMyReviewIdAPI = async (product) => {
  try {
    const { data } = await authInstance.post(
      `/review/get/my/reviewid`,
      JSON.stringify(product),
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
