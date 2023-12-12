import { authInstance } from "../utils/instance";

const MEMBER_API_URI = "/member";

export const getMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/get`);
    return data;
  } catch (err) {
    alert("회원 정보를 가져올 수 없습니다.");
    console.log(err);
  }
};

/*
export const findByNickname = async (nickname) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/nickname/${nickname}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching user data:', error);
    throw error;
  }
};*/
