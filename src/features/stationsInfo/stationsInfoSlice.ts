import { createSlice } from "@reduxjs/toolkit"
import { IStationInfo } from "../../types/interfaces"
import { getStationsInfo } from "./stationsInfoAction"

interface IStationsInfoState {
  stationsInfo: IStationInfo[]
  isLoading: boolean
  error: string | null
}

const initialState: IStationsInfoState = {
  stationsInfo: [],
  isLoading: false,
  error: null,
}

export const stationsInfoSlice = createSlice({
  name: "stationsInfoSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStationsInfo.pending, state => {
        state.isLoading = true
      })
      .addCase(getStationsInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.stationsInfo = action.payload
      })
      .addCase(getStationsInfo.rejected, (state, action) => {
        state.isLoading = false
        state.stationsInfo = []
        state.error = action.payload as string
      })
  },
})

export default stationsInfoSlice
// export const {} = countriesSlice.actions
