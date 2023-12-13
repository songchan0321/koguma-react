import { authInstance } from "../utils/instance";

const POST_API_URI = "/post";
export const callPostListAPI = async () => {
  try {
    const { data } = await authInstance.get(`${POST_API_URI}/list`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//img, location 추가 해야함
export const addPostAPI = async (memberId, title, content, category) => {
  try {
    const { data } = await authInstance.post(
      `${POST_API_URI}/add?memberId=${memberId}`,
      JSON.stringify({
        title: title,
        content: content,
        //latitude :
        //longitude :
        //dong :
        category: category,
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
