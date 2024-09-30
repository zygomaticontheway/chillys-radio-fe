import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { changePassword } from "./userPasswordAction";

interface PasswordState {
  isLoading: boolean
  success: boolean
  error: string | null
};

const initialState: PasswordState = {
  isLoading: false,
  success: false,
  error: null,
};

export const userPasswordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    resetPasswordState: (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, state => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false
        state.success = true
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.error = action.payload || 'Password change error '
      })
  },
});

export default userPasswordSlice;
export const {resetPasswordState} = userPasswordSlice.actions;
