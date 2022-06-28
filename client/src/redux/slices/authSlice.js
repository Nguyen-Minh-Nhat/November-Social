import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, acction) => {
      state.user = acction.payload.user;
      state.accessToken = acction.payload.accessToken;
    },
    logout: (state, acctions) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
