import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./registerActions";

interface IUserState {
  error: string | null;
}

const initialState: IUserState = {
  error: null,
};

const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null; // Сбрасываем ошибку при успешной регистрации
      });
  },
});

export default registerSlice.reducer;
