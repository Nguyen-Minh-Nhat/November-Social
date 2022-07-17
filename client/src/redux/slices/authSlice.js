import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state, actions) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { logout, setCredentials, setAccessToken, setUser } =
  authSlice.actions;
export default authSlice.reducer;
