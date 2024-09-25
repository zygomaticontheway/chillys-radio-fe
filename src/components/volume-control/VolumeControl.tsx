import React, { useRef, useState } from 'react';
import './volumeControl.css'; // CSS для стилей

interface VolumeControlProps {
  onVolumeChange: (volume: number) => void; // Функция для изменения громкости
}

const VolumeControl: React.FC<VolumeControlProps> = ({ onVolumeChange }) => {
  const [volume, setVolume] = useState(1); // Громкость по умолчанию 100% (1.0)
  const volumeRef = useRef<HTMLInputElement | null>(null); // Ссылка на ползунок

  // Изменение громкости
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume); // Вызываем функцию для изменения громкости аудио
  };

  return (
    <div className="volume-control">
      <div className="volume-icon">
        🔊
      </div>
      {/* Полоска с ползунком громкости */}
      <div className="volume-slider">
        <input
          ref={volumeRef}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="slider"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default VolumeControl;
