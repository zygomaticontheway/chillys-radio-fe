import React from 'react';
import { Link } from 'react-router-dom';
import { IStation } from '../../types/interfaces';
import styles from './favoriteStations.module.css';

interface FavoriteStationsProps {
  stations: IStation[]; 
}

const FavoriteStations: React.FC<FavoriteStationsProps> = ({ stations }) => {
  return (
      <div>
          <ul className={styles.favoriteStationsList}>
              {stations.map((station) => (
                  <li key={station.stationuuid} className={styles.favoriteStationItem}>
                      <Link to={`/${station.stationuuid}`}>
                          <img src={station.favicon} alt={`${station.name} icon`} className={styles.favoriteStationIcon} />
                          {station.name}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default FavoriteStations;
