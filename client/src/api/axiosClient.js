import axios from "axios";
import store from "../redux/store";

import jwtDecode from "jwt-decode";
import authApi from "./authApi";
import { setAccessToken } from "../redux/slices/authSlice";

const baseURL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  credentials: "include",
  withCredentials: true,
});

export const setHeader = () => {
  return {
    headers: { Authorization: store.getState().auth.accessToken },
  };
};

export const axiosClientPrivate = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    "content-type": "application/json",
  },
  credentials: "include",
  withCredentials: true,
});

axiosClientPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().auth.accessToken;
    const decodeToken = jwtDecode(accessToken);
    const today = new Date();
    if (decodeToken.exp < today.getTime() / 1000) {
      const res = await authApi.refreshToken();
      const action = setAccessToken(res.data.access_token);
      store.dispatch(action);
      config.headers["Authorization"] = res.data.access_token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosClient;
