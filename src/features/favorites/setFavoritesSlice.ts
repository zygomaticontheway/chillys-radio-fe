import { createSlice } from '@reduxjs/toolkit';
import { IStation } from "../../types/interfaces";
import { setFavoriteStation } from './setFavoritesAction';

interface IFavoritesState {
    favorites: IStation[];
    isLoading: boolean;
    error: string | null;
  }

const initialState: IFavoritesState ={
    favorites: [],
    isLoading: false,
    error: null
}

export const setFavoritesSlice = createSlice({
  name: 'setFavoritesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setFavoriteStation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setFavoriteStation.fulfilled, (state, action) => {
        state.isLoading = false
        state.favorites = action.payload;
      })
      .addCase(setFavoriteStation.rejected, (state, action) => {
        state.isLoading = false
        state.favorites = []
        state.error = action.payload as string
      })
  },
});

export default setFavoritesSlice;
export const { } = setFavoritesSlice.actions