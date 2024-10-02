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
import StationListItem from "../stationListItem/StationListItem"
import styles from "./stationsContainer.module.css"

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

  return (
    <div className={styles.stationListContainer}>
      <StationFilters
        stations={stations}
        onFilterChange={setFilteredStations}
        resetPage={() => setCurrentPage(1)}
      />
      <div className={styles.stationList}>
        {filteredStations.map(station => (
          <div
            key={station.stationuuid}
            className={styles.stationItemWrapper}
            onClick={() => handleStationClick(station)}
          >
            <StationListItem station={station} />
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={filteredStations.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StationContainer
