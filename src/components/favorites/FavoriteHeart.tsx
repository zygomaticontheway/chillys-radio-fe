import { RootState } from "../../redux/store";
import { IStation } from "../../types/interfaces";
import styles from "./favorites.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFavorites, setFavoriteStation } from "../../features/favorites/favoritesAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFavoriteHeartProps {
    station: IStation;
}

const FavoriteHeart: React.FC<IFavoriteHeartProps> = ({ station }) => {

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state: RootState) => state.favorites.favorites);
    const token = localStorage.getItem("user-token");
    const navigate = useNavigate()

    const isFavorite: boolean = favorites.some(fav => fav.stationuuid === station.stationuuid);

    const [isFavoriteHeart, setIsFavoriteHeart] = useState<boolean>();

    //get favorites on component mounting
    useEffect(() => {
        if(token){
            dispatch(getFavorites());
        }
    }, [dispatch]);

    useEffect(() => {
        setIsFavoriteHeart(isFavorite);
    }, [favorites, station.stationuuid]);

    const handleFavoriteToggle = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        token ? 
            dispatch(setFavoriteStation(station.stationuuid)) :
            navigate("/login");
    }

    return (
        <button onClick={handleFavoriteToggle} className={styles.buttonStyle} aria-label="Toggle Favorite">
            {isFavoriteHeart ? (
                <svg className={styles.svgFull} width="24" height="24" fill="red" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ) : (
                <svg className={styles.svgEmpty} width="24" height="24" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z" />
                </svg>
            )}
        </button>
    )
}

export default FavoriteHeart