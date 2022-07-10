import store from "../redux/store";
import { axiosClientPrivate } from "./axiosClient";

const URL = "user/";
const userApi = {
  getAccessToken: () => {
    return store.getState().auth.accessToken;
  },
  searchUsers: async (data) => {
    const res = await axiosClientPrivate.get(URL + `search/${data}`, {
      headers: { Authorization: userApi.getAccessToken() },
    });
    return res;
  },
};

export default userApi;
