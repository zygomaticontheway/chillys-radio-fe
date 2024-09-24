import { IStation, IStationResponse } from "../../types/interfaces"
import { useDispatch } from "react-redux"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate } from "react-router-dom"
import StationsFilters from "./StationsFilters"
import React, { useState } from "react"
import StationListItem from "../stationsListItem/StationListItem"

const StationList: React.FC<IStationResponse> = ({ stations }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filteredStations, setFilteredStations] = useState(stations)

  const handleStationClick = (station: IStation) => {
    dispatch(setActiveStation(station)) // Устанавливаем активную радиостанцию
    navigate(`/station/${station.stationuuid}`) // Перенаправляем на страницу станции
  }

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
export default StationList
