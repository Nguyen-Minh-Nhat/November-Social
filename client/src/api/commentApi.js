import store from "../redux/store";
import { axiosClientPrivate } from "./axiosClient";

const URL = "comment/";
const commentApi = {
  setHeader: () => {
    return {
      headers: { Authorization: store.getState().auth.accessToken },
    };
  },
  create: async (data) => {
    const res = await axiosClientPrivate.post(
      URL + "create",
      data,
      commentApi.setHeader(),
    );
    return res;
  },
  getComments: async (id) => {
    const res = await axiosClientPrivate.get(
      URL + `${id}`,
      commentApi.setHeader(),
    );
    return res;
  },
  delete: async (id) => {
    const res = await axiosClientPrivate.delete(
      URL + `delete/${id}`,
      commentApi.setHeader(),
    );
    return res;
  },
  update: async (data, id) => {
    const res = await axiosClientPrivate.put(
      URL + `update/${id}`,
      data,
      commentApi.setHeader(),
    );
    return res;
  },
  like: async (id) => {
    const res = await axiosClientPrivate.patch(
      URL + `like/${id}`,
      {},
      commentApi.setHeader(),
    );
    return res;
  },
};

export default commentApi;
