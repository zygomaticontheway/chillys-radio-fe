import React, { useRef, useState } from 'react';
import styles from "./volumeControl.module.css"

interface VolumeControlProps {
  onVolumeChange: (volume: number) => void; // volume change function
}

const VolumeControl: React.FC<VolumeControlProps> = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(0.8); // default volume 80%
  const volumeRef = useRef<HTMLInputElement | null>(null); // slider

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume); // Вызываем функцию для изменения громкости аудио
  };

  return (
    <div className={styles.volumeControl}>
      <div className={styles.volumeIcon}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="white" className={styles.volumeIcon}><path d="M0 11.42v9.44h7.16l7.1 5.37V5.98L7.08 11.4zm21.7-2.8c-.68-.67-1.78-.67-2.46 0-.67.67-.67 1.78 0 2.46a6.96 6.96 0 0 1 0 9.83c-.67.67-.67 1.78 0 2.45.34.34.78.5 1.23.5s.9-.16 1.23-.5c4.06-4.06 4.06-10.68 0-14.75zm3.3-5.5c-.85-.46-1.93-.15-2.4.7-.46.85-.15 1.93.7 2.4 3.2 1.74 5.15 5.5 5.12 9.8-.02 4.33-1.98 8.05-5.1 9.7-.86.45-1.2 1.53-.73 2.4.3.6.93.94 1.56.94.28 0 .56-.06.82-.2 4.27-2.26 6.95-7.17 7-12.82C32 10.44 29.34 5.5 25 3.12"></path></svg>
      </div>
      {/* slider line */}
      <div className={styles.volumeSlider}>
        <input
          ref={volumeRef}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.slider}
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
