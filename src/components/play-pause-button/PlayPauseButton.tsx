import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playAudio, pauseAudio } from '../../features/play-pause-button/playPauseSlice';
import { RootState } from '../../redux/store'

interface PlayPauseProps {
  streamUrl: string;
}

const AudioPlayer: React.FC<PlayPauseProps> = ({ streamUrl }) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.playPause.isPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
