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
  getAllFollows: () => {
    const url = "/follow";
    return axiosClient.get(url);
  },
  getAllComments: () => {
    const url = "/comment";
    return axiosClient.get(url);
  },
  getAllReactions: () => {
    const url = "/reaction";
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
  addComment: (payload) => {
    const url = "/comment/";
    return axiosClient.post(url, payload);
  },
  addReaction: (payload) => {
    const url = "/reaction/";
    return axiosClient.post(url, payload);
  },

  // PUT / UPDATE
  updateUser: (ID, payload) => {
    const url = "/user/" + String(ID);
    return axiosClient.put(url, payload);
  },

  // DELETE
  deleteReaction: (ID) => {
    const url = "/reaction/" + String(ID);
    return axiosClient.delete(url);
  },
};
