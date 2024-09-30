import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface IChangePassword{
    userId: number;
    newPassword: string;
}

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ userId, newPassword }:IChangePassword, {rejectWithValue}) => {
    try {
      const response = await axios.post('/api/users/{id}/change-password',{userId, newPassword});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
