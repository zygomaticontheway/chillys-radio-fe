import React, { useState, useEffect } from "react"
import { IStation } from "../../types/interfaces"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate } from "react-router-dom"
import { getStations } from "../../features/stations/stationsActions"
import Loader from "../loader/Loader"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { playAudio } from "../../features/play-pause-button/playPauseSlice"
import StationListItem from "../stationListItem/StationListItem"
import styles from "./stationsContainer.module.css"

const StationsContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const stations = useAppSelector(state => state.stationsResponse.data.content)
  const isLoading = useAppSelector(state => state.stationsResponse.isLoading)
  const error = useAppSelector(state => state.stationsResponse.error)
  
  // local state for filtered stations
  const [filteredStations, setFilteredStations] = useState<IStation[]>([])

  // fetching stations on the component mounting and page number changing
  useEffect(() => {
    dispatch(getStations({ page: currentPage, size: pageSize }))
  }, [dispatch, currentPage, pageSize])

  // Refreshing filtered stations on stations list change
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
      <div className={styles.getStationsLoader}>
        <Loader />
      </div>
    )
  if (error) return <div className={styles.error}>Error: {error}</div>

  return (
    <div className={styles.stationListContainerWrapper}>
      <div className={styles.stationsFilterTitle}>Stations [Filter title] ([filtered stations amount]):</div>
      <div className={styles.stationListContainer}>
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

export default StationsContainer
