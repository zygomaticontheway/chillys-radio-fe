import { IStation } from "../../types/interfaces"
import FavoriteHeart from "../favorites/FavoriteHeart"
import styles from "./stationListItem.module.css"

interface StationListItemProps {
  station: IStation
}

const StationListItem: React.FC<StationListItemProps> = ({ station }) => {

  return (
    <div className={styles.stationItem}>
      <div className={styles.imgContainer}>
        <img
          src={station.favicon || "/media/TheCR_Banner1_res.jpg"}
          alt={station.name}
          className={styles.stationIcon}
        />
        <div className={styles.favoriteHeartContainer}>
          <FavoriteHeart station={station} />
        </div>
      </div>
      <div className={styles.stationInfo}>
        <h4 className={styles.stationName}>{station.name}</h4>
        <p className={styles.stationCountryLanguage}>
          <span>{station.country}</span>  <span className={styles.stationLanguage}>{station.language}</span>
        </p>
        <p className={styles.stationTags}>{station.tags}</p>
      </div>
    </div>
  )
}

export default StationListItem
