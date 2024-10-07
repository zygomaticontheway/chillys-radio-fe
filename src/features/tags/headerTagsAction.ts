import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHeaderTags = createAsyncThunk(
  'getHeaderTags',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/stations/tags');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getHeaderCountries = createAsyncThunk(
    'getHeaderCountries',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/api/stations/countries');
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const getHeaderLanguages = createAsyncThunk(
    'getHeaderLanguages',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/api/stations/languages');
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
