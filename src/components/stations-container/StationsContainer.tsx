import React, { useState, useEffect } from "react"
import { IStation } from "../../types/interfaces"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate, useSearchParams } from "react-router-dom"
import Loader from "../loader/Loader"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { playAudio } from "../../features/play-pause-button/playPauseSlice"
import StationListItem from "../stationListItem/StationListItem"
import styles from "./stationsContainer.module.css"
import { filteredStations, getStations, searchStations } from "../../features/stations/stationsActions"

const StationsContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const pageSize = useAppSelector(state => state.filter.pageSize);

  // const [filters, setFilters] = useState({
  //   name: searchParams.get("name") || "",
  //   country: searchParams.get("country") || "",
  //   language: searchParams.get("language") || "",
  //   tags: searchParams.get("tag") || "",
  //   search: searchParams.get("search") || ""
  // });

  const stations = useAppSelector(state => state.stationsResponse.data.content)
  const isLoading = useAppSelector(state => state.stationsResponse.isLoading)
  const error = useAppSelector(state => state.stationsResponse.error)
  const filter = useAppSelector(state => state.filter)

  useEffect(() => {
    dispatch(getStations({ page: currentPage, size: pageSize }));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    setSearchParams({ page: String(currentPage + 1) });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  // // Фетчинг данных при изменении страницы или фильтров
  // useEffect(() => {
  //   if (filters.search) {
  //     dispatch(searchStations({ search: filters.search, page: currentPage, size: pageSize }));
  //     return
  //   } if (filters.name || filters.country || filters.language || filters.tags) {
  //     dispatch(filteredStations({ ...filters, page: currentPage, size: pageSize }));
  //   } else {
  //     dispatch(getStations({ page: currentPage, size: pageSize }));
  //   }
  // }, [dispatch, currentPage, filters]);

  // // Обновляем currentPage, если он изменился в query params
  // useEffect(() => {
  //   const pageFromUrl = Number(searchParams.get("page"));
  //   if (pageFromUrl && pageFromUrl !== currentPage) {
  //     setCurrentPage(pageFromUrl);
  //   }
  // }, [searchParams, currentPage]);

  // // Обновляем query params при смене фильтров
  // const updateFilter = (key: string, value: string) => {
  //   setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  //   setSearchParams({ ...filters, [key]: value, page: "0" }); // Сбрасываем на первую страницу при изменении фильтров
  //   setCurrentPage(1);
  // };

  // const handleNextPage = () => {
  //   const nextPage = currentPage + 1;
  //   setCurrentPage(nextPage);
  //   setSearchParams({ ...filters, page: String(nextPage) });
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     const prevPage = currentPage - 1;
  //     setCurrentPage(prevPage);
  //     setSearchParams({ ...filters, page: String(prevPage) });
  //   }
  // };

  const handleStationClick = (station: IStation) => {
    dispatch(setActiveStation(station))
    dispatch(playAudio())
    navigate(`/${station.stationuuid}`)
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
      <div className={styles.stationsFilterTitle}>{filter.filterTitle === "" ? "Choose your radio station:" : `Stations with ${filter.filterTitle}:`}</div>
      <div className={styles.stationListContainer}>
        {stations.map(station => (
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
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={stations.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StationsContainer
