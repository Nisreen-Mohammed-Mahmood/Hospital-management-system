import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    const response = await axios.get("/user/profile");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { data: {}, role: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.role = action.payload.role;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
