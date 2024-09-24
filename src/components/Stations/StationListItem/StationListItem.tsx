import React from 'react';
import { Link } from 'react-router-dom';
import { Station } from '../../../types/station';
import styles from './StationListItem.module.css';

interface StationListItemProps {
  station: Station;
}

const StationListItem: React.FC<StationListItemProps> = ({ station }) => {
  return (
    <div className={styles.stationItem}>
      <img className={styles.favicon} src={station.favicon || '/default-favicon.png'} alt={station.name} />
      <h3 className={styles.stationName}>{station.name}</h3>
      <p className={styles.stationInfo}>{station.country} - {station.language}</p>
      <div className={styles.tags}>
        {Array.isArray(station.tags) && station.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <Link to={`/stations/${station.stationuuid}`}>Details</Link>
    </div>
  );
};

export default StationListItem;