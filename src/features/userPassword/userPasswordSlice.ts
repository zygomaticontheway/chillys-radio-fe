import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { changePassword } from "./userPasswordAction";

interface PasswordState {
  isLoading: boolean
  success: boolean | null
  error: string | null
  isAdmin: boolean | null
};

const initialState: PasswordState = {
  isLoading: false,
  success: false,
  error: null,
  isAdmin: null,
};

export const userPasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    resetPasswordState: (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = null;
        state.isAdmin = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false
        state.success = true
        state.isAdmin = true
      
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload || 'Password change error '
      })
  },
});

export default userPasswordSlice;
export const {resetPasswordState} = userPasswordSlice.actions;
