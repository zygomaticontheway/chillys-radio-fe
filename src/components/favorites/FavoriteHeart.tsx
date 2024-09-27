import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { IStation } from "../../types/interfaces";
import styles from "./favoriteHeart.module.css"
import { useEffect, useState } from "react";
import { setFavoriteStation } from "../../features/favorites/setFavoritesAction";
import { useAppSelector } from "../../redux/hooks";

interface ISetFavoriteProps {
    station: IStation;
}

const SetFavorite: React.FC<ISetFavoriteProps> = ({ station }) => {

    const dispatch = useDispatch();

    const favorites = useAppSelector((state: RootState) => state.favorites.favorites);
    const userId = useAppSelector((state: RootState) => state.user.user.id)
    const token = useAppSelector((state: RootState) => state.user.user.token)
    const stationuuid = station.stationuuid;

    const isFavorite = () => {
        return (favorites.includes(station))
    }
    
    const [isFull, setHeart] = useState<boolean>(isFavorite())

    useEffect(() => {
        dispatch(setFavoriteStation(token, userId, stationuuid))
    }, [])

    
    const handleFavoritesClick = (): void => {
        
        return setFavoriteStation(token,
            userId,
            stationuuid,)

    }
    

    return (
        <div className={styles.heart}>
            {isFull ?
                <div className={styles.fullHeart}></div> : <div className={styles.emptyHeart}></div>

            }

        </div>
    )
}

export default SetFavorite