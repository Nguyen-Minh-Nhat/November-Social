import store from "../redux/store";
import { axiosClientPrivate } from "./axiosClient";

const URL = "post/";
const postApi = {
  setHeader: () => {
    return {
      headers: { Authorization: store.getState().auth.accessToken },
    };
  },
  create: async (data) => {
    const res = await axiosClientPrivate.post(
      URL + "create",
      data,
      postApi.setHeader(),
    );
    return res;
  },
  get: async (page = 1) => {
    const res = await axiosClientPrivate.get(
      URL + `?page=${page}&limit=${5}`,
      postApi.setHeader(),
    );
    return res;
  },
  delete: async (id) => {
    const res = await axiosClientPrivate.delete(
      URL + `delete/${id}`,
      postApi.setHeader(),
    );
    return res;
  },
  update: async (data, id) => {
    const res = await axiosClientPrivate.put(
      URL + `update/${id}`,
      data,
      postApi.setHeader(),
    );
    return res;
  },
  like: async (id) => {
    const res = await axiosClientPrivate.patch(
      URL + `like/${id}`,
      {},
      postApi.setHeader(),
    );
    return res;
  },
};

export default postApi;
