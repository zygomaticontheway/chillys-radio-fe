import React from 'react';
import { IStation } from '../../types/interfaces';
import styles from './favoriteStations.module.css';
import FavoriteHeart from '../../components/favorites/FavoriteHeart'; 
import { useAppSelector } from '../../redux/hooks';

const FavoriteStations: React.FC = () => {
    const favoriteStations = useAppSelector(state => state.favorites.favorites);

    return (
        <div className={styles.favoriteStationsGrid}>
            {favoriteStations.map((station: IStation) => (
                <div key={station.stationuuid} className={styles.favoriteStationItem}>
                    <img src={station.favicon} alt={`${station.name} icon`} className={styles.favoriteStationIcon} />
                    <div className={styles.favoriteIconContainer}>
                        <div className={styles.heartBackground} />
                        <FavoriteHeart station={station} /> 
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoriteStations;
