import { axiosClientPrivate, setHeader } from "./axiosClient";

const URL = "chat/";

const chatApi = {
  getConversations: async () => {
    const res = await axiosClientPrivate.get(
      URL + `conversations`,
      setHeader(),
    );
    return res;
  },
  accessConversation: async (id) => {
    const res = await axiosClientPrivate.get(URL + `access/${id}`, setHeader());
    return res;
  },
  createMessage: async (data) => {
    const res = await axiosClientPrivate.post(
      URL + `message`,
      data,
      setHeader(),
    );
    return res;
  },
  getMessages: async (id, page = 2) => {
    const res = await axiosClientPrivate.get(
      URL + `message/${id}?limit=${page * 9}`,
      setHeader(),
    );
    return res;
  },
  deleteMessage: async (id) => {
    const res = await axiosClientPrivate.delete(
      URL + `message/${id}`,
      setHeader(),
    );
    return res;
  },
};

export default chatApi;
