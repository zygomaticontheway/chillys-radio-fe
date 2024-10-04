import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getIsAdminFromToken, getNameFromToken } from './tokenUtils';


interface IChangePassword{
    name?: string;
    oldPassword: string;
    newPassword: string;
    isAdmin?: boolean;
}

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ oldPassword, newPassword }:IChangePassword, {rejectWithValue}) => {
    const name = getNameFromToken();
    const isAdmin = getIsAdminFromToken();

    if(!name){
      return rejectWithValue('Failed to get the name from the token')
    }
    try{
      const response = await axios.post(`/api/users/${name}/change-password`,{name,oldPassword,newPassword});
      
      if(response) {
        return {response: true, isAdmin};
      } else {
        return rejectWithValue(' Error when changing password ');
      }
    } catch (error) {
      return rejectWithValue('Error during query execution');
    }
  }
);
