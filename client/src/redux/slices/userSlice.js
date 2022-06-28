import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
const initialState = {
  data: { user: {}, accessToken: "" },
  loading: false,
  error: undefined,
};

export const login = createAsyncThunk("user/login", async (payload) => {
  const res = await authApi.login(payload);
  console.log(res.data);
  const data = { user: res.data.user, accessToken: res.data.access_token };
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return (
            action.type.startsWith("user/") && action.type.endsWith("/pending")
          );
        },
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => {
          return (
            action.type.startsWith("user/") &&
            action.type.endsWith("/fulfilled")
          );
        },
        (state, action) => {
          state.loading = false;
          console.log(action.payload);
          state.data = action.payload;
        },
      );
  },
});

export default userSlice.reducer;
