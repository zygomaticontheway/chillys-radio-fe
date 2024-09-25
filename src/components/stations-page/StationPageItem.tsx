import { useParams } from "react-router-dom";
import { IStation } from "../../types/interfaces"
import styles from "./stationsPageItem.module.css"
import { useEffect, useState } from "react";

const initialStation:IStation ={
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

export default function StationPageItem () {
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/stations/${id}`)
            .then(res => res.json())
            .then(data => setStation(data))
    }, [id])

    const [station, setStation] = useState<IStation>(initialStation)
    

    return (
        <>
            <div className={styles.stationPageItem}>
                <img
                    src={station.favicon || "default-station-icon.png"}
                    alt={station.name}
                    className="station-icon"
                />
                <div className="station-info">
                    <h4 className="station-name">{station.name}</h4>
                    <p className="station-details">
                        {station.country} | {station.language}
                    </p>
                    <p className="station-tags">{station.tags}</p>
                </div>
            </div>
            <div className="station-meta">
                <span className="station-votes">{station.votes} votes</span>
                <span className="station-votes">{station.clickcount} votes</span>
            </div>
        </>
    )
}
