import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import stationsSlice from "../features/stations/stationsSlice"
import authSlice from "../features/auth/authSlice"
import playPauseSlice from "../features/play-pause-button/playPauseSlice"
import setPlayingStationSlice from "../features/stations/setPlayingStationSlice"


export const store = configureStore({
  reducer: {
    stations: stationsSlice.reducer,
    user: authSlice.reducer,
    playPause: playPauseSlice.reducer,
    playingStation: setPlayingStationSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
