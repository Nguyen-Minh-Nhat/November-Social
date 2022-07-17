import { axiosClientPrivate, setHeader } from "./axiosClient";

const URL = "user/";
const userApi = {
  searchUsers: async (data) => {
    const res = await axiosClientPrivate.get(
      URL + `search/${data}`,
      setHeader(),
    );
    return res;
  },
  follow: async (id) => {
    const res = await axiosClientPrivate.patch(
      URL + `follow/${id}`,
      {},
      setHeader(),
    );
    return res;
  },
  suggestionsUser: async () => {
    const res = await axiosClientPrivate.get(
      URL + "suggestionsUser",
      setHeader(),
    );
    return res;
  },
};

export default userApi;
