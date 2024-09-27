import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const setFavoriteStation = createAsyncThunk(
  "setFavoriteStation",
  async (
    { token,
      userId,
      stationuuid,
}: { token: string; userId: number; stationuuid: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "/api/users/my-favorites",
        {
          userId,
          stationuuid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to set favorite station")
    }
  },
)
