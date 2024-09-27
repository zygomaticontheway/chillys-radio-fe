import { createSlice } from '@reduxjs/toolkit';
import { IStation } from '../../types/interfaces';
import { getFavorites } from './getFavoritesAction';

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

export const getFavoritesSlice = createSlice({
    name: 'getFavoritesSlice',
    initialState,
    reducers: {
        cleanFavorites: (state) => {
            state.favorites = [];
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getFavorites.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getFavorites.fulfilled, (state, action) => {
          state.isLoading = false
          state.favorites = action.payload;
        })
        .addCase(getFavorites.rejected, (state, action) => {
          state.isLoading = false
          state.favorites = []
          state.error = action.payload as string
        })
    },
  });
  
  export default getFavoritesSlice;
  export const { cleanFavorites } = getFavoritesSlice.actions