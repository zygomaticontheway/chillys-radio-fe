import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import stationsSlice from "../features/stations/stationsSlice"
import authSlice from "../features/auth/authSlice"
import playPauseSlice from "../features/play-pause-button/playPauseSlice"
import setPlayingStationSlice from "../features/stations/setPlayingStationSlice"
import { favoritesSlice } from "../features/favorites/favoritesSlice"
import getAllStationsAmountSlice from "../features/stations/getAllStationsAmountSlice"
import userPasswordSlice from "../features/userPassword/userPasswordSlice"
import stationsInfoSlice from "../features/stationsInfo/stationsInfoSlice"
import filtersSlice from "../features/filter/filtersSlice"


export const store = configureStore({
  reducer: {
    stationsResponse: stationsSlice.reducer,
    user: authSlice.reducer,
    playPause: playPauseSlice.reducer,
    playingStation: setPlayingStationSlice.reducer,
    favorites: favoritesSlice.reducer,
    stationsInfo: stationsInfoSlice.reducer,
    allStationsAmount: getAllStationsAmountSlice.reducer,
    password: userPasswordSlice.reducer,
    filter: filtersSlice.reducer,
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
