import React from 'react';
import { Link } from 'react-router-dom';
import { IStation } from '../../types/interfaces';
import styles from './favoriteStations.module.css';

interface FavoriteStationsProps {
  stations: IStation[];
}

const FavoriteStations: React.FC<FavoriteStationsProps> = ({ stations }) => {
  return (
      <div className={styles.favoriteStationsGrid}>
          {stations.map((station) => (
              <Link to={`/${station.stationuuid}`} key={station.stationuuid} className={styles.favoriteStationItem}>
                  <img src={station.favicon} alt={`${station.name} icon`} className={styles.favoriteStationIcon} />
              </Link>
          ))}
      </div>
  );
};

export default FavoriteStations;
