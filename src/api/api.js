import axiosClient from "./axiosClient";

export const api = {
  //GET
  getAllUsers: () => {
    const url = "/user";
    return axiosClient.get(url);
  },
  getUser: (ID) => {
    const url = "/user/" + String(ID);
    return axiosClient.get(url);
  },
  getAllPosts: () => {
    const url = "/post";
    return axiosClient.get(url);
  },
  getPost: (ID) => {
    const url = "/post/" + String(ID);
    return axiosClient.get(url);
  },

  //POST
  addUser: (payload) => {
    const url = "/user/";
    return axiosClient.post(url, payload);
  },
  addPost: (payload) => {
    const url = "/post/";
    return axiosClient.post(url, payload);
  },
};
