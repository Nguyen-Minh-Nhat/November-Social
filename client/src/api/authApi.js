const { default: axiosClient } = require("./axiosClient");

const URL = "auth/";
const authApi = {
  checkMail: async (data) => {
    const res = await axiosClient.post(URL + "checkEmail", data);
    return res.data;
  },
  register: async (data) => {
    const res = await axiosClient.post(URL + "register", data);
    return res.data;
  },

  activeAccount: async (data) => {
    const res = await axiosClient.post(URL + "activation", data);
    return res.data;
  },
  googleLogin: async (data) => {
    const res = await axiosClient.post(URL + "google_login", data);
    return res;
  },
  facebookLogin: async (data) => {
    const res = await axiosClient.post(URL + "facebook_login", data);
    return res;
  },
  login: async (data) => {
    const res = await axiosClient.post(URL + "login", data);
    return res;
  },
  logout: async () => {
    const res = await axiosClient.get(URL + "logout");
    return res;
  },
};

export default authApi;
