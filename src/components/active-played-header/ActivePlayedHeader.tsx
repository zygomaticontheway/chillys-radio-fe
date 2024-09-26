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
            <img src={activeStation.favicon  || "src/media/TheCR_Banner1_res.jpg"} alt={activeStation.name} className={styles.stationIcon} />
            <div className={styles.playPauseButton}><PlayPauseButton streamUrl={activeStation.url_resolved} /></div>
            <div className={styles.volumeButton}><VolumeControl onVolumeChange={handleVolumeChange} /></div>
            <h3 className={styles.stationName}>{activeStation.name}</h3>
        </div>
    )
}
export default ActivePlayedHeader;

/*
для выбора станции чтобы передать ее в плеер в списке станций необходимо прописать:

 interface StationListProps {
  stations: Station[];
}

const StationList: React.FC<StationListProps> = ({ stations }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleStationClick = (station: Station) => {
    dispatch(setActiveStation(station));  // Устанавливаем активную радиостанцию
    history.push(`/station/${station.stationuuid}`);  // Перенаправляем на страницу станции
  };

  return (
    <div className="station-list">
      {stations.map((station) => (
        <div key={station.id} className="station-item" onClick={() => handleStationClick(station)}>
          <img src={station.favicon} alt={station.name} className="station-icon" />
          <h4>{station.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default StationList;

-------
При выборе станции её данные сохраняются в localStorage, чтобы при следующей загрузке страницы активная станция оставалась.
*/