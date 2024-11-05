// ! Unused file as an example of filtering at the front-end

import React, { useState, useMemo } from "react"
import { IStation } from "../../types/interfaces"

interface StationFiltersProps {
  stations: IStation[]
  onFilterChange: (filteredStations: IStation[]) => void
  resetPage: () => void
}

const StationFilters: React.FC<StationFiltersProps> = ({
  stations,
  onFilterChange,
  resetPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [tagFilter, setTagFilter] = useState("")
  const [countryFilter, setCountryFilter] = useState("")
  const [languageFilter, setLanguageFilter] = useState("")

  const uniqueTags = useMemo(
    () => [...new Set(stations.flatMap(station => station.tags.split(",")))],
    [stations],
  )
  const uniqueCountries = useMemo(
    () => [...new Set(stations.map(station => station.country))],
    [stations],
  )
  const uniqueLanguages = useMemo(
    () => [...new Set(stations.map(station => station.language))],
    [stations],
  )

  const applyFilters = () => {
    if (!searchTerm && !tagFilter && !countryFilter && !languageFilter) {
      onFilterChange(stations)
      resetPage()
      return
    }

    const filteredStations = stations.filter(
      station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (tagFilter === "" ||
          station.tags.toLowerCase().includes(tagFilter.toLowerCase())) &&
        (countryFilter === "" ||
          station.country.toLowerCase() === countryFilter.toLowerCase()) &&
        (languageFilter === "" ||
          station.language.toLowerCase() === languageFilter.toLowerCase()),
    )
    onFilterChange(filteredStations)
    resetPage()
  }

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value)
      setTimeout(applyFilters, 300)
    }

  return (
    <div className="station-filters">
      <input
        type="text"
        placeholder="Search stations"
        value={searchTerm}
        onChange={handleInputChange(setSearchTerm)}
        className="search-input"
      />
      <select
        value={tagFilter}
        onChange={handleInputChange(setTagFilter)}
        className="filter-select"
      >
        <option value="">All Tags</option>
        {uniqueTags.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <select
        value={countryFilter}
        onChange={handleInputChange(setCountryFilter)}
        className="filter-select"
      >
        <option value="">All Countries</option>
        {uniqueCountries.map(country => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        value={languageFilter}
        onChange={handleInputChange(setLanguageFilter)}
        className="filter-select"
      >
        <option value="">All Languages</option>
        {uniqueLanguages.map(language => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StationFilters
