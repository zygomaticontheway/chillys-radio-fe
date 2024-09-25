// src/redux/playPauseSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface IAudioPlayerState {
  isPlaying: boolean;
}

const initialState: IAudioPlayerState = {
  isPlaying: false,
};

const playPauseSlice = createSlice({
  name: 'playPauseSlice',
  initialState,
  reducers: {
    playAudio: (state) => {
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { playAudio, pauseAudio } = playPauseSlice.actions;
export default playPauseSlice;
