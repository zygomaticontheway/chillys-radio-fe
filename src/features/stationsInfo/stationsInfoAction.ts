import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getStationsInfo = createAsyncThunk(
  'getStationsInfo',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/stations/stations-info');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
