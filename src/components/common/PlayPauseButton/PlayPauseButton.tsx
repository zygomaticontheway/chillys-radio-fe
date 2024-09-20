// src/components/PlayPauseButton.tsx
import React, { useState } from 'react';
import styles from './PlayPauseButton.module.css';

const PlayPauseButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default PlayPauseButton;
