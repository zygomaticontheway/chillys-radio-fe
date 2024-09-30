import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getFavorites = createAsyncThunk(
  "getFavorites",
  async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/users/my-favorites`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return response.data
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data || "Failed to get favorite stations",
    )
  }
})

export const setFavoriteStation = createAsyncThunk(
  "setFavoriteStation",
  async (stationuuid: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/users/my-favorites",
        {
          stationuuid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to set favorite station",
      )
    }
  },
)
