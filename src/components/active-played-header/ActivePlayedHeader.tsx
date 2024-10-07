import { useAppSelector } from "../../redux/hooks";
import PlayPauseButton from "../play-pause-button/PlayPauseButton";
import VolumeControl from "../volume-control/VolumeControl";
import styles from "./activePlayedHeader.module.css"


const ActivePlayedHeader = () => {

    const { activeStation } = useAppSelector(state => state.playingStation)

    if (!activeStation) return null;

    const handleVolumeChange = (volume: number) => {
        const audioElement = document.querySelector('audio') as HTMLAudioElement;
        if (audioElement) {
            audioElement.volume = volume;
        }
    };

    return (
        <div className={styles.activePlayedHeader}>
            <img src={activeStation.favicon  || "/media/TheCR_Banner1_res.jpg"} alt={activeStation.name} className={styles.stationIcon} />
            <div className={styles.playPauseButton}><PlayPauseButton streamUrl={activeStation.url_resolved} /></div>
            <div className={styles.volumeButton}><VolumeControl onVolumeChange={handleVolumeChange} /></div>
            <h3 className={styles.stationName}>{activeStation.name}</h3>
        </div>
    )
}
export default ActivePlayedHeader;
