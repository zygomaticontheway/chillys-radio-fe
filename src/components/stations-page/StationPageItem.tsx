import { useParams } from "react-router-dom";
import { IStation } from "../../types/interfaces"
import styles from "./stationsPageItem.module.css"
import { useEffect, useState } from "react";
import FavoriteHeart from "../favorites/FavoriteHeart";

const initialStation: IStation = {
    stationuuid: "",
    name: "",
    url_resolved: "",
    favicon: "",
    tags: "",
    country: "",
    language: "",
    votes: 0,
    clickcount: 0

}

export default function StationPageItem() {
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/stations/${id}`)
            .then(res => res.json())
            .then(data => setStation(data))
    }, [id])

    const [station, setStation] = useState<IStation>(initialStation)


    return (
        <div className={styles.stationPage}>
            <div className={styles.stationPageItem}>
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
                        {station.country} | {station.language}
                    </p>
                    <p className={styles.stationTags}>{station.tags}</p>
                </div>
                <div className={styles.stationRating}>
                    <span className={styles.stationVotes}>{station.votes} votes</span> | 
                    <span className={styles.stationClicks}>{station.clickcount} clicks</span>
                </div>
            </div>
        </div>
    )
}
