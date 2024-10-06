import { createSlice, } from "@reduxjs/toolkit"
import { changePassword } from "./userPasswordAction";

interface PasswordState {
  oldPassword: string
  newPassword: string
  loading: boolean 
  success: boolean
  error: string | null
};

const initialState: PasswordState = {
  oldPassword: '',
  newPassword: '',
  loading: false,
  success: false,
  error: null,
};

export const userPasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    setOldPassword: (state, action) => {
      state.oldPassword = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
  

    resetPasswordState: (state) => {
      state.oldPassword = '';
      state.newPassword = '';
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  
  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
        state.success = true
        state.oldPassword = ''
        state.newPassword = ''
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      });
  },
});

export default userPasswordSlice;
export const {setOldPassword, setNewPassword,resetPasswordState} = userPasswordSlice.actions;
