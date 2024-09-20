import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopStationsPage.module.css';
import { getTopStations } from '../services/api';
import { Station } from '../types/station';

const TopStationsPage: React.FC = () => {
  const [topStations, setTopStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchTopStations = async () => {
      const data = await getTopStations();
      setTopStations(data);
    };
    fetchTopStations();
  }, []);

  return (
    <div className={styles.topStationsPage}>
      <h2>Top Stations</h2>
      <ul className={styles.stationList}>
        {topStations.map((station) => (
          <li key={station.stationuuid}>
            <Link to={`/stations/${station.stationuuid}`}>
              <img src={station.favicon || '/default-favicon.png'} alt={station.name} />
              <span>{station.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopStationsPage;