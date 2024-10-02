import { IStation } from "../../types/interfaces"
import FavoriteHeart from "../favorites/FavoriteHeart"
import styles from "./stationListItem.module.css"

interface StationListItemProps {
  station: IStation
}

const StationListItem: React.FC<StationListItemProps> = ({ station }) => {

  return (
    <div className="station-item">

      <div className="station-item-content">
        <img
          src={station.favicon || "default-station-icon.png"}
          alt={station.name}
          className="station-icon"
        />
        <div className={styles.favoriteHeartContainer}>
          <FavoriteHeart station={station} />
        </div>
        <div className="station-info">
          <h4 className="station-name">{station.name}</h4>
          <p className="station-details">
            {station.country} | {station.language}
          </p>
          <p className="station-tags">{station.tags}</p>
        </div>
      </div>
    </div>
  )
}

export default StationListItem
