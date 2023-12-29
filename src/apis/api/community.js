import { authInstance } from "../utils/instance";

const POST_API_URI = "/post";
const COMMENT_API_URI = "/comment";

export const callPostListAPI = async (keyword) => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list?keyword=${keyword || ""}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByCategoryAPI = async (categoryId) => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list/category/${categoryId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${POST_API_URI}/list/member`);
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callCommentedPostListByMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${COMMENT_API_URI}/list/member`);
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const callPostListByViewAPI = async () => {
  try {
    const { data } = await authInstance.get(
      `${POST_API_URI}/list/category/view`
    );
    return data.content;
  } catch (err) {
    console.log(err);
  }
};

export const addPostAPI = async (postDTO) => {
  try {
    const { categoryId, ...rest } = postDTO;

    const response = await authInstance.post(
      `${POST_API_URI}/add`,
      {
        ...rest,
        categoryDTO: {
          id: categoryId,
        },
      },
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
    throw err;
  }
};

export const getPostAPI = async (postId) => {
  const { data } = await authInstance.get(`${POST_API_URI}/get/${postId}`);
  return data;
};

export const updatePostAPI = async (postId, updateData) => {
  const { data } = await authInstance.put(
    `${POST_API_URI}/${postId}/update`,
    updateData
  );
  return data;
};

export const deletePostAPI = async (postId) => {
  const { data } = await authInstance.get(`${POST_API_URI}/${postId}/delete`);
  return data;
};

export const callCommentListAPI = async (postId) => {
  const { data } = await authInstance.get(`${COMMENT_API_URI}/list/${postId}`);
  return data;
};

export const callReplyListAPI = async (commentId) => {
  const { data } = await authInstance.get(
    `${COMMENT_API_URI}/list/reply/${commentId}`
    // ,
    // {
    //   id: commentId,
    // }
  );
  console.log(data);
  return data;
};

export const addCommentAPI = async (
  postId,
  writerId,
  content,
  activeFlag,
  parentId
) => {
  try {
    const response = await authInstance.post(
      `${COMMENT_API_URI}/add`,
      {
        memberDTO: {
          id: writerId,
        },
        postDTO: {
          id: postId,
        },
        content: content,
        activeFlag: activeFlag,
        parentDTO: {
          id: parentId,
        },
      },
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
    throw err;
  }
};

export const getCommentAPI = async (commentId) => {
  const { data } = await authInstance.get(
    `${COMMENT_API_URI}/get/${commentId}`
  );
  return data;
};

export const deleteCommentAPI = async (commentId) => {
  const { data } = await authInstance.get(
    `${COMMENT_API_URI}/${commentId}/delete`
  );
  return data;
};

export const getCommentCountsAPI = async (postId) => {
  const { data } = await authInstance.get(
    `${COMMENT_API_URI}/counts/${postId}`
  );
  return data;
};
