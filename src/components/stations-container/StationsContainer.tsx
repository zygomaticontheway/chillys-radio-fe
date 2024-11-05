import React, { useEffect } from "react"
import { IStation } from "../../types/interfaces"
import { setActiveStation } from "../../features/stations/setPlayingStationSlice"
import { useNavigate } from "react-router-dom"
import Loader from "../loader/Loader"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { playAudio } from "../../features/play-pause-button/playPauseSlice"
import StationListItem from "../stationListItem/StationListItem"
import styles from "./stationsContainer.module.css"
import { filteredStations, getStations, getTopClicksStations, getTopVotesStations, searchStations } from "../../features/stations/stationsActions"
import { setCurrentPage } from "../../features/filter/filtersSlice"

const StationsContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [currentLocalPage, setCurrentLocalPage] = useState<number>(Number(searchParams.get("page")) || 1);

  const stations = useAppSelector(state => state.stationsResponse.data.content)
  const isLoading = useAppSelector(state => state.stationsResponse.isLoading)
  const error = useAppSelector(state => state.stationsResponse.error)
  const filter = useAppSelector(state => state.filter)
  const itemsAmount = useAppSelector(state => state.stationsResponse.data.totalElements)
  const isFirst = useAppSelector(state => state.stationsResponse.data.first)
  const isLast = useAppSelector(state => state.stationsResponse.data.last)

  useEffect(() => {
    switch (filter.filterType) {
      case 'top clicks':
        dispatch(getTopClicksStations({ page: filter.currentPage, size: filter.pageSize }));
        break;
      case 'top votes':
        dispatch(getTopVotesStations({ page: filter.currentPage, size: filter.pageSize }));
        break;
      case 'search':
        dispatch(searchStations({ search: filter.filterValue, page: filter.currentPage, size: filter.pageSize }));
        break;
      case 'country':
        dispatch(filteredStations({
          name: '',
          country: filter.filterValue,
          language: '',
          tags: '',
          page: filter.currentPage,
          size: filter.pageSize
        }));
        break;
      case 'language':
        dispatch(filteredStations({
          name: '',
          country: '',
          language: filter.filterValue,
          tags: '',
          page: filter.currentPage,
          size: filter.pageSize
        }))
        break;
      case 'tag':
        dispatch(filteredStations({
          name: '',
          country: '',
          language: '',
          tags: filter.filterValue,
          page: filter.currentPage,
          size: filter.pageSize
        }))
        break;
      case '':
        dispatch(getStations({ page: filter.currentPage, size: filter.pageSize }))
        break;
    }
  }, [dispatch, filter]);

  const handleNextPage = () => {
    const nextPage = filter.currentPage + 1;
    dispatch(setCurrentPage(nextPage));
  };

  const handlePreviousPage = () => {
    const nextPage = filter.currentPage - 1;
    dispatch(setCurrentPage(nextPage));
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
      <div className={styles.stationsFilterTitle}>
        {filter.filterType === "" ? "Choose your radio station:" : `Stations with ${filter.filterType} ${filter.filterValue} (${itemsAmount}):`}</div>
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
          disabled={isFirst}
        >
          Back
        </button>
        <span>Page {filter.currentPage + 1}</span>
        <button
          onClick={handleNextPage}
          disabled={isLast}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default StationsContainer
