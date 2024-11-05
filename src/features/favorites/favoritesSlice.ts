import { createSlice } from "@reduxjs/toolkit"
import { IStation } from "../../types/interfaces"
import { getFavorites, setFavoriteStation } from "./favoritesAction"

interface IFavoritesState {
  favorites: IStation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IFavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
}

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {
    cleanFavorites: state => {
      state.favorites = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFavorites.pending, state => {
        state.isLoading = true
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false
        state.favorites = action.payload
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false
        state.favorites = []
        state.error = action.payload as string
      })
      .addCase(setFavoriteStation.pending, state => {
        state.isLoading = true
      })
      .addCase(setFavoriteStation.fulfilled, (state, action) => {
        state.isLoading = false
        state.favorites = action.payload
      })
      .addCase(setFavoriteStation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { cleanFavorites } = favoritesSlice.actions
