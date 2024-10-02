import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IRegisterFormValues } from "../../components/register/Register";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: IRegisterFormValues, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      return response.data;
    } catch (error: any) {
      // Возвращаем ошибку через rejectWithValue, чтобы она обрабатывалась в Redux
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
