import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { IUserData } from "./types/authType";
import { IRegisterFormValues } from "../../components/register/Register";

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const registerUser = createAsyncThunk(
  "registerUser",
    async (data: IRegisterFormValues, thunkAPI) => {
       try {
           const response: AxiosResponse<IUserData> = await axios.post(
        "/api/auth/register",
        data,
        );
     
     return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
