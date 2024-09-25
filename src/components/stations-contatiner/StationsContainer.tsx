import { IStation } from "../../types/interfaces"
import { useSelector } from "react-redux"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate } from "react-router-dom"
import StationsFilters from "./StationsFilters"
import React, { useEffect, useState } from "react"
import { RootState } from '../../redux/store';
import { getStations } from "../../features/stations/stationsActions"
import Loader from "../loader/Loader"
import { useAppDispatch } from "../../redux/hooks"

const StationContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Получаем данные из Redux
  const stations = useSelector((state: RootState) => state.stations.stations);
  const isLoading = useSelector((state: RootState) => state.stations.isLoading);
  const error = useSelector((state: RootState) => state.stations.error);

  // Локальный стейт для фильтрованных станций
  const [filteredStations, setFilteredStations] = useState<IStation[]>(stations);

  // Запрашиваем станции при монтировании компонента
  useEffect(() => {
    dispatch(getStations());
  }, [dispatch]);

  // Обновляем фильтрованные станции при изменении списка станций
  useEffect(() => {
    setFilteredStations(stations);
  }, [stations]);

  const handleStationClick = (station: IStation) => {
    dispatch(setActiveStation(station)) // Устанавливаем активную радиостанцию
    navigate(`/station/${station.stationuuid}`) // Перенаправляем на страницу станции
  }

  if (isLoading) return <div className="get-stations-loader"><Loader/></div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="station-list-container">
      <StationsFilters
        stations={stations}
        onFilterChange={setFilteredStations}
      />
      <div className="station-list">
        {filteredStations.map(station => (
          <div
            key={station.stationuuid}
            className="station-item"
            onClick={() => handleStationClick(station)}
          >
            <img
              src={station.favicon}
              alt={station.name}
              className="station-icon"
            />
            <h4>{station.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
export default StationContainer
