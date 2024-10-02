import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "./types/authType";
import { registerUser } from "./registerActions";

interface IUserState {
  user: IUserData;
  isLoading: boolean;
  error: string;
}

const initialUser: IUserData = {
  id: 0,
  name: "",
  email: "",
  password: "",
  accessToken: "",
  refreshToken: "",
};

const initialState: IUserState = {
  user: initialUser,
  isLoading: false,
  error: "",
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialUser; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
      })
      // .addCase(getUserWithToken.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload;
      // })
      // .addCase(getUserWithToken.pending, (state) => {
      //   state.isLoading = true;
      // });
  },
});

export default registerSlice;
export const { logoutUser } = registerSlice.actions;


