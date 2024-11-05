import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getStations = createAsyncThunk(
  "getStations",
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/stations?page=${page}&size=${size}`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const searchStations = createAsyncThunk(
  "stations/search", 
  async ({ search, page, size }: { search: string; page: number; size: number }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `/api/stations/search?search=${search}&page=${page}&size=${size}`,
    )
    return response.data
  } catch (error) {
    return rejectWithValue("An error occurred while searching stations")
  }
})

export const filteredStations = createAsyncThunk(
  "stations/filtered", 
  async ({ name, country, language, tags, page, size }: { name: string; tags: string; country: string; language: string; page: number; size: number }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `/api/stations/filtered?name=${name}&tags=${tags}&country=${country}&language=${language}&page=${page}&size=${size}`,
    )
    return response.data
  } catch (error) {
    return rejectWithValue("An error occurred while searching stations")
  }
})

export const getTopVotesStations = createAsyncThunk(
  "getTopVotesStations",
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/stations/top-votes?page=${page}&size=${size}`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
export const getTopClicksStations = createAsyncThunk(
  "getTopClicksStations",
  async ({ page, size }: { page: number; size: number }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/stations/top-clicks?page=${page}&size=${size}`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const getAllStationsAmount = createAsyncThunk(
  "getAllStationsAmount",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/stations/amount`)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
