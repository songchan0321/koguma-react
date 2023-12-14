import axios from "axios";
import { authInstance, defaultInstance } from "../utils/instance";

const CLUB_API_URI = `/club`;

//== 1. 모임 2. 모임원 3. 만남  ==//

//-- 1. 모임 -- //
export const getClubAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/${clubId}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubAPI = async () => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/list`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const categoryListAPI = async () => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/category/CLUB`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubByCategoryAPI = async (onCategorySelect) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/list/category/${onCategorySelect}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listMyClubAPI = async () => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/joins`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//--2. 모임원 -- //
export const checkClubMemberAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/member/check/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const joinRequestAPI = async (clubId, joinProfile) => {
  try {
    alert(joinProfile.nickname);
    const { data } = await authInstance.post(
      `${CLUB_API_URI}/join/request`,
      JSON.stringify({
        clubDTO: {
          id: clubId,
        },
        nickname: joinProfile.nickname,
        content: joinProfile.content,
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

export const listClubMemberAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/members/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getClubMemberAPI = async (clubMemberId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/member/profile/${clubMemberId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubJoinRequest = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/join/requests/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

//--3. 모임 일정-- //
// export const getMeetUpAPI = async (clubId) => {
//   try {
//     const { data } = await authInstance.get(
//       `${CLUB_API_URI}/meet-up/${clubId}`
//     );
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const listMeetUpAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/list/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addMeetUpAPI = async (
  clubId,
  title,
  content,
  maxCapacity,
  roadAddr
) => {
  alert(title);
  try {
    await authInstance.post(
      `${CLUB_API_URI}/add/meet-up`,

      JSON.stringify({
        clubDTO: {
          id: 4,
        },
        title: title,
        content: content,
        maxCapacity: maxCapacity,
        meetDate: null, // 서버에서 설정하거나 적절한 값으로 가정
        roadAddr: roadAddr,
      }),

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const getClubMeetUp = async (meetUpId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/${meetUpId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listJoinMeetUpMemberAPI = async (meetUpId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/${meetUpId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const checkJoinMeetUpAPI = async (clubId, meetUpId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/check/join?clubId=${clubId}&meetUpId=${meetUpId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const joinMeetUpCancelAPI = async (clubId, meetUpId, isJoined) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/cancel`,
      JSON.stringify({
        clubId: clubId,
        meetUpId: meetUpId,
        isJoined: isJoined,
      })
    );
  } catch (err) {
    console.log(err);
  }
};
