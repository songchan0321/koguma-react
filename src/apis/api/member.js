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
