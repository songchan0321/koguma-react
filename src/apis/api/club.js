import { authInstance } from "../utils/instance";

const CLUB_API_URI = `/club`;

//== 1. 모임 2. 모임원 3. 만남  4. 포스트==//

//-- 1. 모임 -- //
export const addClubAPI = async (formData) => {
  try {
    const { data } = await authInstance.post(
      `${CLUB_API_URI}/add`,
      JSON.stringify({
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        urls: formData.urls,
        nickname: formData.nickname,
        memberContent: formData.memberContent,
        maxCapacity: formData.maxCapacity,
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

export const allClubAPI = async () => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/all`);
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

export const listClubByCategoryAPI = async (onCategorySelect, keyword) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/list?keyword=${keyword || ""}&category=${
        onCategorySelect || ""
      }`
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

export const checkJoinRequestAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/check/join/request/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const joinRequestAPI = async (clubId, joinProfile) => {
  try {
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

export const cancelJoinReauestAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/join/request/cancel/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const rejectJoinRequestAPI = async (joinId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/reject/join/${joinId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const acceptJoinRequestAPI = async (joinId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/accept/join/${joinId}`
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

export const countClubMemberAPI = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/members/count/${clubId}`
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

export const listMeetUpAPI = async (clubId, type) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/list/${clubId}/${type}`
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
  roadAddr,
  combinedDateTime
  // meetUpData
) => {
  try {
    await authInstance.post(
      `${CLUB_API_URI}/add/meet-up`,

      JSON.stringify({
        clubDTO: {
          id: clubId,
        },
        clubId: clubId,
        title: title,
        content: content,
        maxCapacity: maxCapacity,
        roadAddr: roadAddr,
        meetUpData: combinedDateTime,
        meetUpType: "null",
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
      `${CLUB_API_URI}/meet-up/members/${meetUpId}`
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

export const joinMeetUpRequestAPI = async (meetUpId, clubMember) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/join?clubMeetUpId=${meetUpId}&clubMemberId=${clubMember.id}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const joinMeetUpCancelAPI = async (clubId, meetUpId) => {
  try {
    const { data } = await authInstance.post(
      `${CLUB_API_URI}/meet-up/cancel`,
      JSON.stringify({
        clubId: clubId,
        meetUpId: meetUpId,
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

export const countMeetUpJoinMember = async (meetUpId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/join/count/${meetUpId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

///== 4. 모임 포스트 ==///
export const listMyClubPostAPI = async () => {
  try {
    const { data } = await authInstance.post(`${CLUB_API_URI}/post/list/my`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubPost = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/post/list/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubPostByCategory = async (categoryId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/post/lists/category/${categoryId}`
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const listClubPostCategories = async (clubId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/post/categories/${clubId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addClubPostCategory = async (clubId, name) => {
  try {
    const { data } = await authInstance.post(
      `${CLUB_API_URI}/post/category/add`,
      JSON.stringify({
        clubId: clubId,
        name: name,
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

export const addClubPost = async (clubId, formData, selectedCategory) => {
  try {
    console.log(`이미지가 잘 들어왔느 ${formData.selectedFile[0]}`);

    const { data } = await authInstance.post(
      `${CLUB_API_URI}/post/add`,
      JSON.stringify({
        clubId: clubId,
        clubCategoryId: selectedCategory,
        title: formData.title,
        content: formData.content,
        images: formData.selectedFile[0],
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

export const getClubPostAPI = async (clubPostId) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/post/${clubPostId}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// == 5. meetUp map == //

export const getGeo = async (address) => {
  try {
    const { data } = await authInstance.get(
      `${CLUB_API_URI}/meet-up/addr?address=${address}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const nearClubMapAPI = async () => {
  try {
    const { data } = await authInstance.get(`${CLUB_API_URI}/near/map`);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (clubPostId, clubId, content) => {
  try {
    const { data } = await authInstance.post(
      `${CLUB_API_URI}/post/comment/add`,
      JSON.stringify({
        clubId: clubId,
        clubPostId: clubPostId,
        content: content,
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

export const listComment = async (clubPostId) => {
  const { data } = await authInstance.get(
    `${CLUB_API_URI}/post/comment/list/${clubPostId}`
  );
  return data;
};
