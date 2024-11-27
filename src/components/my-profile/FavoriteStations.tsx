import React from 'react';
import { IStation } from '../../types/interfaces';
import styles from './favoriteStations.module.css';
import FavoriteHeart from '../../components/favorites/FavoriteHeart'; 
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setActiveStation } from '../../features/stations/setPlayingStationSlice';
import { playAudio } from '../../features/play-pause-button/playPauseSlice';

const FavoriteStations: React.FC = () => {
    const favoriteStations = useAppSelector(state => state.favorites.favorites);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const handleStationClick = (station: IStation) => {
        dispatch(setActiveStation(station))
        dispatch(playAudio())
        navigate(`/${station.stationuuid}`)
      }

    return (
        <div className={styles.favoriteStationsGrid}>
            {favoriteStations.map((station: IStation) => (
                <div key={station.stationuuid} className={styles.favoriteStationItem} onClick={() => {handleStationClick(station)}}>
                    <img 
                        src={station.favicon || "/media/TheCR_Banner1_res.jpg"}  
                        alt={`${station.name} icon`} 
                        className={styles.favoriteStationIcon} 
                    />
                    <div className={styles.favoriteIconContainer}>
                        <div className={styles.heartBackground} />
                        <FavoriteHeart station={station} /> 
                    </div>
                    <h4 className={styles.stationName}>{station.name}</h4>
                </div>
            ))}
        </div>
    );
};

export default FavoriteStations;


