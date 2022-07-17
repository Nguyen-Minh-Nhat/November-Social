import { axiosClientPrivate, setHeader } from "./axiosClient";

const URL = "comment/";
const commentApi = {
  create: async (data) => {
    const res = await axiosClientPrivate.post(
      URL + "create",
      data,
      setHeader(),
    );
    return res;
  },
  getComments: async (id) => {
    const res = await axiosClientPrivate.get(URL + `${id}`, setHeader());
    return res;
  },
  getReplyComments: async (id) => {
    const res = await axiosClientPrivate.get(URL + "reply/" + id, setHeader());
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

export default commentApi;
