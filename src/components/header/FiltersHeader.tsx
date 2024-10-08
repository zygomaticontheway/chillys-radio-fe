import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getStationsInfo } from '../../features/stationsInfo/stationsInfoAction';
import { filteredStations, getStations, getTopClicksStations, getTopVotesStations } from '../../features/stations/stationsActions';

interface FiltersHeaderProps {
  headerLinks: Array<{ path: string; label: string }>;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ headerLinks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const stationsInfo = useAppSelector(state => state.stationsInfo.stationsInfo);
  
  useEffect(() => {
    dispatch(getStationsInfo());
  }, [dispatch]);

  const filterStationsByType = (type: string) => {
    return stationsInfo
      .filter(stationInfo => stationInfo.type === type)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 49);
  };

  const countries = useMemo(() => filterStationsByType("country"), [stationsInfo]);
  const languages = useMemo(() => filterStationsByType("language"), [stationsInfo]);
  const tags = useMemo(() => filterStationsByType("tag"), [stationsInfo]);

  const handleMouseEnter = (label: string) => {
    setActiveFilter(label);
  };

  const handleMouseLeave = () => {
    setActiveFilter(null);
  };

  const handleAllStationsClick = () => {
    dispatch(getStations({ page: 1, size: 50 }));
    navigate('/');
  };

  const renderFilterContent = (label: string) => {
    switch (label) {
      case 'Top Stations':
        return (
          <>
            <button onClick={() => {
              dispatch(getTopClicksStations({ page: 1, size: 20 }));
              navigate("/");
            }} className={styles.headerFilterButton}>Top Clicks</button>
            <button onClick={() => {
              dispatch(getTopVotesStations({ page: 1, size: 20 }));
              navigate("/");
            }} className={styles.headerFilterButton}>Top Votes</button>
          </>
        );
      case 'Country':
        return countries.length > 0 ? (
          countries.map((stationInfo) => (
            <button 
              key={stationInfo.id}
              onClick={() => {
                dispatch(filteredStations({
                  page: 1, 
                  size: 20,
                  name: '',
                  tags: '',
                  country: stationInfo.title,  // Используем title как название страны
                  language: ''
                }));
                navigate("/");
              }} 
              className={styles.headerFilterButton}
            >
              {stationInfo.title}
            </button>
          ))
        ) : <p>Loading countries...</p>;
      case 'Language':
        return languages.length > 0 ? (
          languages.map((stationInfo) => (
            <button 
              key={stationInfo.id}
              onClick={() => {
                dispatch(filteredStations({
                  page: 1, size: 20,
                  name: '',
                  tags: '',
                  country: '',
                  language: stationInfo.title
                }));
                navigate("/");
              }} 
              className={styles.headerFilterButton}
            >
              {stationInfo.title}
            </button>
          ))
        ) : (
          <p>Loading languages...</p>
        );
      case 'Tags':
        return tags.length > 0 ? (
          tags.map((stationInfo) => (
            <button 
              key={stationInfo.id}
              onClick={() => {
                dispatch(filteredStations({
                  page: 1, size: 20,
                  name: '',
                  tags: stationInfo.title,
                  country: '',
                  language: ''
                }));
                navigate("/");
              }} 
              className={styles.headerFilterButton}
            >
              {stationInfo.title}
            </button>
          ))
        ) : (
          <p>Loading tags...</p>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {headerLinks.map((link) => (
          <li
            key={link.path}
            className={styles.navItem}
            onMouseEnter={link.label !== 'All Stations' ? () => handleMouseEnter(link.label) : undefined}
            onMouseLeave={link.label !== 'All Stations' ? handleMouseLeave : undefined}
          >
            {link.label === 'All Stations' ? (
              <Link to="/" onClick={handleAllStationsClick} className={styles.navLink}>
                {link.label}
              </Link>
            ) : (
              <Link to={link.path} className={styles.navLink}>
                {link.label}
              </Link>
            )}
            {activeFilter === link.label && (
              <div className={styles.filterDropdown}>
                {renderFilterContent(link.label)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FiltersHeader;
