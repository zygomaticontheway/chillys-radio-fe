import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, pauseAudio } from '../../features/play-pause-button/playPauseSlice';
import { RootState } from '../../redux/store'

interface PlayPauseProps {
  streamUrl: string;
}

const AudioPlayer: React.FC<PlayPauseProps> = ({ streamUrl }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.audioPlayer.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(pauseAudio());
      } else {
        audioRef.current.play();
        dispatch(playAudio());
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div>
      <audio ref={audioRef} src={streamUrl} />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
