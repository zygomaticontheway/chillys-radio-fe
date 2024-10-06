import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./registerActions";

interface IUserState {
  isLoading: boolean;
  error: string;
}

const initialState: IUserState = {
  isLoading: false,
  error: "",
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice;
