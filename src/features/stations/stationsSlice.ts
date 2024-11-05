import { createSlice } from "@reduxjs/toolkit"
import {
  IStationResponse,
  IStationResponseData,
} from "../../types/interfaces"
import { filteredStations, getStations, getTopClicksStations, getTopVotesStations, searchStations } from "./stationsActions"

const initialStateIStationResponseData: IStationResponseData = {
  content: [],
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  numberOfElements: 0,
  first: true,
  empty: false,
}

const initialState: IStationResponse = {
  data: initialStateIStationResponseData,
  isLoading: false,
  error: null,
}

const stationsSlice = createSlice({
  name: "stationsSlice",
  initialState,
  reducers: {
    cleanStations: state => {
      state.data = initialStateIStationResponseData
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStations.pending, state => {
        state.isLoading = true
      })
      .addCase(getStations.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getStations.rejected, (state, action) => {
        state.isLoading = false
        state.data = initialStateIStationResponseData
        state.error = action.payload as string
      })
      .addCase(searchStations.pending, state => {
        state.isLoading = true
      })
      .addCase(searchStations.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(searchStations.rejected, (state, action) => {
        state.isLoading = false
        state.data = initialStateIStationResponseData
        state.error = action.payload as string
      })
      .addCase(filteredStations.pending, state => {
        state.isLoading = true
      })
      .addCase(filteredStations.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(filteredStations.rejected, (state, action) => {
        state.isLoading = false
        state.data = initialStateIStationResponseData
        state.error = action.payload as string
      })
      .addCase(getTopVotesStations.pending, state => {
        state.isLoading = true
      })
      .addCase(getTopVotesStations.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getTopVotesStations.rejected, (state, action) => {
        state.isLoading = false
        state.data = initialStateIStationResponseData
        state.error = action.payload as string
      })
      .addCase(getTopClicksStations.pending, state => {
        state.isLoading = true
      })
      .addCase(getTopClicksStations.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getTopClicksStations.rejected, (state, action) => {
        state.isLoading = false
        state.data = initialStateIStationResponseData
        state.error = action.payload as string
      })
  },
})

export default stationsSlice
export const { cleanStations } = stationsSlice.actions
