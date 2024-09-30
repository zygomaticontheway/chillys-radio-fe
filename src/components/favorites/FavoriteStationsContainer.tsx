import { useSelector } from "react-redux";
import { IStation } from "../../types/interfaces";
import FavoriteHeart from "./FavoriteHeart";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { getFavorites } from "../../features/favorites/favoritesAction";

const FavoriteStationsList: React.FC = () => {

    const dispatch = useAppDispatch;
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    useEffect (() => {
        dispatch(getFavorites())
    })
  
    return (
      <div>
        {favorites.map((station: IStation) => (
          <div key={station.stationuuid} className="station-item">
            <h3>{station.name}</h3>
            <FavoriteHeart station={station} />
          </div>
        ))}
      </div>
    );
  };
  
  export default FavoriteStationsList;