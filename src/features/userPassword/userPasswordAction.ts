import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface IChangePassword{
    userId: number;
    oldPassword: string;
    newPassword: string;
}

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ userId, oldPassword, newPassword }:IChangePassword, {rejectWithValue}) => {
    try {
      const token =localStorage.getItem('user-token');
      if(!token) {
        return rejectWithValue("You need to log in")
      }
      const response = await axios.post(`/api/users/${userId}/change-password`,{userId,oldPassword,newPassword},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
