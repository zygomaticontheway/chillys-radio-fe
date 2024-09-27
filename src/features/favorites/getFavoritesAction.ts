import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { IStation } from "../../types/interfaces"
import { RootState } from "../../redux/store"

export const getFavorites = createAsyncThunk<
  IStation[],
  { token: string; userId: number },
  { state: RootState; rejectValue: string }
>(
  "getFavorites",
  async (
    { token, userId }: { token: string; userId: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get(`/api/users/${userId}/my-favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to set favorite station",
      )
    }
  },
)
