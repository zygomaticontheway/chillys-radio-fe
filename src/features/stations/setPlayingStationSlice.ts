import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IStation } from "../../types/interfaces"

export interface StationState {
  activeStation: IStation | null
  isPlaying: boolean
}

const initialState: StationState = {
  activeStation: null,
  isPlaying: false,
}

const savedStation = localStorage.getItem("activeStation")
if (savedStation) {
  initialState.activeStation = JSON.parse(savedStation)
  initialState.isPlaying = true
}

const setPlayingStationSlice = createSlice({
  name: "setPlayingStation",
  initialState,
  reducers: {
    setActiveStation: (state, action: PayloadAction<IStation>) => {
      state.activeStation = action.payload
      state.isPlaying = true
      localStorage.setItem("activeStation", JSON.stringify(action.payload)) // Сохранение станции в localStorage
    },
    togglePlay: state => {
      state.isPlaying = !state.isPlaying
    },
  },
})

export const { setActiveStation, togglePlay } = setPlayingStationSlice.actions
export default setPlayingStationSlice
