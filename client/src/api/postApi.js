import { axiosClientPrivate, setHeader } from "./axiosClient";

const URL = "post/";
const postApi = {
  create: async (data) => {
    const res = await axiosClientPrivate.post(
      URL + "create",
      data,
      setHeader(),
    );
    return res;
  },
  get: async (page = 1) => {
    const res = await axiosClientPrivate.get(
      URL + `?page=${page}&limit=${5}`,
      setHeader(),
    );
    return res;
  },
  delete: async (id) => {
    const res = await axiosClientPrivate.delete(
      URL + `delete/${id}`,
      setHeader(),
    );
    return res;
  },
  update: async (data, id) => {
    const res = await axiosClientPrivate.put(
      URL + `update/${id}`,
      data,
      setHeader(),
    );
    return res;
  },
  like: async (id) => {
    const res = await axiosClientPrivate.patch(
      URL + `like/${id}`,
      {},
      setHeader(),
    );
    return res;
  },
};

export default postApi;
