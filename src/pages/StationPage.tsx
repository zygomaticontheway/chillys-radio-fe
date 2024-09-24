import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './StationPage.module.css';
import { getStationByStationuuid } from '../services/api';
import { Station } from '../types/station';

const StationPage: React.FC = () => {
  const { stationId } = useParams<{ stationId: string }>();
  const [station, setStation] = useState<Station | null>(null);

  useEffect(() => {
    const fetchStation = async () => {
      if (stationId) {
        const data = await getStationByStationuuid(stationId);
        setStation(data);
      }
    };
    fetchStation();
  }, [stationId]);

  if (!station) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.stationPage}>
      <h2>{station.name}</h2>
      <img src={station.favicon || '/default-favicon.png'} alt={station.name} />
      <p>Country: {station.country}</p>
      <p>Language: {station.language}</p>
      <p>Votes: {station.votes}</p>
      <p>Clicks: {station.clickcount}</p>
      <h3>Tags:</h3>
      <ul>
        {station.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default StationPage;