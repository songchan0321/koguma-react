import { authInstance } from "../utils/instance";

// export const addImageAPI = async (file) => {
//   try {
//     const { data } = await authInstance.post(`/image/new`, file, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
export const uploadImageAPI = async (file) => {
  try {
    const { data } = await authInstance.post(`/image/new`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const addLocationAPI = async (locationDTO) => {
  const response = await authInstance.post(
    `/location/new`,
    locationDTO,
    JSON.stringify(locationDTO),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const listLocationAPI = async () => {
  try {
    const response = await authInstance.get(`/location/list`);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateSearchRangeAPI = async (locationDTO) => {
  try {
    const response = await authInstance.put(
      `/location/`,
      locationDTO,
      JSON.stringify(locationDTO),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    alert(err);
  }
};
export const deleteLocationAPI = async (locationId) => {
  try {
    console.log(locationId);
    const response = await authInstance.delete(`/location/${locationId}`);
    console.log(response);
    return response;
  } catch (err) {
    alert(err);
  }
};
export const getLocationAPI = async (locationId) => {
  console.log(locationId);
  const { data } = await authInstance.get(`/location/${locationId}`);
  console.log(data);
  return data;
};
export const getLocationByMemberAPI = async (memberId) => {
  const { data } = await authInstance.get(`/location/member/${memberId}`);
  console.log(data);
  return data;
};

export const updateRepLocationAPI = async (locationId) => {
  try {
    const response = await authInstance.put(`/location/rep/${locationId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const loginMemberhasLocationAPI = async () => {
  const { data } = await authInstance.get(`/location/check`);
  return data;
};
export const getRepLocationAPI = async () => {
  try {
    const response = await authInstance.get(`/location/rep`);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const addImageAPI = async (urlList) => {
  const { data } = await authInstance.post("/image/add", urlList, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const getGeo = async (address) => {
  const { data } = await authInstance.get(
    `/location/kakao/getDot?address=${address}`
  );
  return data;
};
