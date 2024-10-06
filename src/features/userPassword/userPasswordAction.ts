import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface IChangePassword {
  oldPassword: string
  newPassword: string
}

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    { oldPassword, newPassword }: IChangePassword,
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "/api/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            "Content-Type": "application/json",
          },
        },
      )
      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      )
    }
  },
)

