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
export const addImageAPI = async (file) => {
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
