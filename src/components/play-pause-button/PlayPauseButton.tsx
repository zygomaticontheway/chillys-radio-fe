import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, pauseAudio } from '../../features/play-pause-button/playPauseSlice';
import { RootState } from '../../redux/store'
import styles from './playPauseButton.module.css' 
import Loader from '../loader/Loader';

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
    <div>
      <audio ref={audioRef} src={streamUrl} />

      {/* Если аудио загружается, показываем прелоудер, иначе — кнопку */}
      <button onClick={togglePlayPause} disabled={isLoading}>
        {isLoading ? (
          <div className={styles.loader}><Loader/></div> // Прелоудер
        ) : (
          <span>{isPlaying ? <img src="src/media/pause.png" alt="pause" /> : <img src="src/media/play.png" alt="pause" /> }</span> // Стандартная кнопка
        )}
      </button>
    </div>
  );
};

export default PlayPauseButton;
