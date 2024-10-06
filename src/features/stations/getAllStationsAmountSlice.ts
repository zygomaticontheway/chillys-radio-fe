import { createSlice } from "@reduxjs/toolkit"
import { getAllStationsAmount } from "./stationsActions"

interface IStationsAmountResponse {
  amount: number
  isLoading: boolean
  error: string | null
}

const initialState: IStationsAmountResponse = {
  amount: 0,
  isLoading: false,
  error: null,
}

export const getAllStationsAmountSlice = createSlice({
  name: "getAllStationsAmountSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllStationsAmount.pending, state => {
        state.isLoading = true
      })
      .addCase(getAllStationsAmount.fulfilled, (state, action) => {
        state.isLoading = false
        state.amount = action.payload
      })
      .addCase(getAllStationsAmount.rejected, (state, action) => {
        state.isLoading = false
        state.amount = 0
        state.error = action.payload as string
      })
  },
})

export default getAllStationsAmountSlice
export const {} = getAllStationsAmountSlice.actions
