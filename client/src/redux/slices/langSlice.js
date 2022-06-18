import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  code: "vi",
};
const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.code = action.payload;
    },
  },
});

export default langSlice.reducer;
