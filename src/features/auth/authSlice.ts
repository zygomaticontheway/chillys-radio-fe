import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "./types/authType";
import { getUserWithToken, loginUser } from "./authActions";

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

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialUser; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = initialUser;
        state.error = action.payload as string;
      })
      .addCase(getUserWithToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWithToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserWithToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice;
export const { logoutUser } = authSlice.actions;


