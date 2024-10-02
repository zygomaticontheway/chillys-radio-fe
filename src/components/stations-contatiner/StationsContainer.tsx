import React, { useState, useEffect } from "react"
import { IStation } from "../../types/interfaces"
import { useSelector } from "react-redux"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate } from "react-router-dom"
import StationFilters from "./StationsFilters"
import { RootState } from "../../redux/store"
import { getStations } from "../../features/stations/stationsActions"
import Loader from "../loader/Loader"
import { useAppDispatch } from "../../redux/hooks"
import { playAudio } from "../../features/play-pause-button/playPauseSlice"

const StationContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  // Получаем данные из Redux
  const stations = useSelector((state: RootState) => state.stations.stations)
  const isLoading = useSelector((state: RootState) => state.stations.isLoading)
  const error = useSelector((state: RootState) => state.stations.error)

  // Локальный стейт для фильтрованных станций
  const [filteredStations, setFilteredStations] = useState<IStation[]>([])

  // Запрашиваем станции при монтировании компонента или при изменении страницы
  useEffect(() => {
    dispatch(getStations({ page: currentPage, size: pageSize }))
  }, [dispatch, currentPage, pageSize])

  // Обновляем фильтрованные станции при изменении списка станций
  useEffect(() => {
    setFilteredStations(stations)
  }, [stations])

  const handleStationClick = (station: IStation) => {
    dispatch(setActiveStation(station))
    dispatch(playAudio())
    navigate(`/${station.stationuuid}`)
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  if (isLoading)
    return (
      <div className="get-stations-loader">
        <Loader />
      </div>
    )
  if (error) return <div className="error">Ошибка: {error}</div>

  // Вычисляем текущие станции для отображения на странице
  const paginatedStations = filteredStations

  // Форматируем вывод в 4 строки по 5 элементов
  const rows = []
  for (let i = 0; i < paginatedStations.length; i += 5) {
    rows.push(paginatedStations.slice(i, i + 5))
  }

  return (
    <div className="station-list-container">
      <StationFilters
        stations={stations}
        onFilterChange={setFilteredStations}
        resetPage={() => setCurrentPage(1)}
      />
      <div className="station-list">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="station-row"
            style={{ display: "flex", marginBottom: "10px" }}
          >
            {row.map(station => (
              <div
                key={station.stationuuid}
                className="station-item"
                onClick={() => handleStationClick(station)}
              >
                <img
                  src={station.favicon}
                  alt={station.name}
                  className="station-icon"
                  style={{ width: "50px", height: "50px" }}
                />
                <h4>{station.name}</h4>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pagination" style={{ marginTop: "20px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={stations.length < pageSize}>
          Next
        </button>
      </div>
    </div>
  )
}

export default StationContainer
