import { authInstance } from "../utils/instance";

const MEMBER_API_URI = "/member";

export const getMemberAPI = async () => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/profile/get`);
    return data;
  } catch (err) {
    alert("회원 정보를 가져올 수 없습니다.");
    console.log(err);
  }
};
export const addMemberAPI = async () => {
  try {
    const { data } = await authInstance.post(`/auth/member/add`);
    return data;
  } catch (err) {
    alert("회원 정보를 등록할 수 없습니다.");
    console.log(err);
  }
};

export const deleteMemberAPI = async () => {
  try {
    const { data } = await authInstance.put(`${MEMBER_API_URI}/delete`);
    return data;
  } catch (err) {
    alert("회원 정보를 삭제할 수 없습니다.");
    console.log(err);
  }
};

export const updateMemberAPI = async () => {
  try {
    const { data } = await authInstance.put(`${MEMBER_API_URI}/update`);
    return data;
  } catch (err) {
    alert("회원 정보를 수정할 수 없습니다.");
    console.log(err);
  }
}
export const listBlockAPI = async () => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/relationship/block/list`);
    return data;
  } catch (err) {
    alert("차단 목록을 불러올 수 없습니다.");
    console.log(err);
  }
};

export const listFollowingAPI = async () => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/relationship/following/list`);
    return data;
  } catch (err) {
    alert("팔로잉 목록을 불러올 수 없습니다.");
    console.log(err);
  }
};

export const getBlockAPI = async (targetMemberId) => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/relationship/block/get/${targetMemberId}`);
    return data;
  } catch (err) {
    alert("차단 정보를 불러올 수 없습니다.");
    console.log(err);
  }
};

export const getFollowingAPI = async (targetMemberId) => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/relationship/following/get/${targetMemberId}`);
    return data;
  } catch (err) {
    alert("차단 정보를 불러올 수 없습니다.");
    console.log(err);
  }
};

export const deleteBlockAPI = async (targetMemberId) => {
  try {
    const response = await authInstance.put('/member/relationship/block/delete', { targetMemberId });
    return response.data;
  } catch (error) {
    alert('차단을 해제할 수 없습니다.');
    console.log(error);
  }
};

export const deleteFollowingAPI = async (targetMemberId) => {
  try {
    const response = await authInstance.put('/member/relationship/following/delete', { targetMemberId });
    return response.data;
  } catch (error) {
    alert('팔로잉을 해제할 수 없습니다.');
    console.log(error);
  }
};

/*
export const getBlockAPI = async () => {
  try {
    const { data } = await authInstance.get(`${MEMBER_API_URI}/relationship/block/get/${targetMemberId}`);
    return data;
  } catch (err) {
    alert("팔로잉 목록을 불러올 수 없습니다.");
    console.log(err);
  }
};

*/
