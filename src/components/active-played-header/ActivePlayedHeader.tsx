import { useEffect } from "react"
import { getStations } from "../../features/stations/stationsActions"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Loader from "../loader/Loader";

export const ActivePlayedHeader = () => {

    const dispatch = useAppDispatch();

    const {stations, isLoading, error} = useAppSelector (state => state.stations)

    useEffect (() => {
        dispatch(getStations());
    }, [dispatch]);


return(
    <div className="active-player-header">
        {/* {error && <h3>{error}</h3>} */}
        {/* {isLoading && <Loader/>} */}
        <div className="station-icon">icon</div>
        <div className="play-pause-button">play</div>
        <div className="volume-button">volume</div>
        <div className="station-name">name</div>
    </div>
)

}