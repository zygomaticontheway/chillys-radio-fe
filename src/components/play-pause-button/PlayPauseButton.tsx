import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, pauseAudio } from '../../features/play-pause-button/playPauseSlice';
import { RootState } from '../../redux/store'
import styles from './playPauseButton.module.css'

interface PlayPauseProps {
  streamUrl: string;
}

const PlayPauseButton: React.FC<PlayPauseProps> = ({ streamUrl }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.playPause.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const audio = audioRef.current;

    if (audio) {
      const handleCanPlay = () => setIsLoading(false); // Когда аудио готово
      const handleLoadStart = () => setIsLoading(true); // Начало загрузки

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadstart', handleLoadStart);

      // Очистка слушателей при размонтировании компонента
      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, []);

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
    <div className={styles.playPauseContainer} onClick={togglePlayPause}>
      <audio ref={audioRef} src={streamUrl} />
        {isLoading ? (
          <div className={styles.loader}/>
        ) : (
          <div className={`${styles.button} ${isPlaying ? styles.pause : styles.play}`}/>
        )}
    </div>
  );
};

export default PlayPauseButton;
