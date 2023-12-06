import { authInstance } from "../utils/instance";

const MEMBER_API_URI = "/member";

export const getMemberAPI = async (memberId) => {
  try {
    const { data } = await authInstance.get(
      `${MEMBER_API_URI}/get/${memberId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
