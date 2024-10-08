import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ILoginFormValues } from "../../components/login/Login";
import { IUserData } from "./types/authType";

axios.defaults.headers.common['Accept'] = 'application/json';

export const loginUser = createAsyncThunk(
  "loginUser",
  //вместо data придут данные из формы, когда мы их получение вызовем через dispatch
  async (data: ILoginFormValues, thunkAPI) => {
    // console.log("data:", data);

    try {
      //поскольку post запрос, мы можем передать данные не в строке, а в отдельной переменной
      // в данном случае в data лежат данные из формы, мы их передаем в API
      const response: AxiosResponse<IUserData> = await axios.post(
        "/api/auth/login",
        data,
        );
      
      //сохраняем токен во внутр хранилище в браузере local storage
      // сохраненные в нем данные из него не будут стираться при перезагрузке страницы
      localStorage.setItem('user-token', response.data.accessToken)
      
      // console.log("data:", response.data);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserWithToken = createAsyncThunk(               
  "getUserWithToken",                                           
  async (accessToken: string, thunkAPI) => {
    try {
      const response: AxiosResponse<IUserData> = await axios.get(
        "/api/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
