import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getStationsInfo } from '../../features/stationsInfo/stationsInfoAction';
import { resetFilters, setFilter} from '../../features/filter/filtersSlice';
import { headerLinks } from './links'

const FiltersHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeLocalFilter, setActiveLocalFilter] = useState<string | null>(null);
  const stationsInfo = useAppSelector(state => state.stationsInfo.stationsInfo);

  useEffect(() => {
    dispatch(getStationsInfo());
  }, [dispatch]);

  const splitStationsInfoByType = (type: string) => {
    return stationsInfo
      .filter(stationInfo => stationInfo.type === type)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 49);
  };

  const countries = useMemo(() => splitStationsInfoByType("country"), [stationsInfo]);
  const languages = useMemo(() => splitStationsInfoByType("language"), [stationsInfo]);
  const tags = useMemo(() => splitStationsInfoByType("tag"), [stationsInfo]);

  const handleAllStationsClick = () => {
    dispatch(resetFilters());
    navigate('/');
  };

  const renderFilterContent = (label: string) => {
    switch (label) {
      case 'Top Stations':
        return (
          <>
            <button onClick={() => {
              dispatch(setFilter({ filterType: "top clicks", filterValue: "", currentPage: 1, pageSize: 20 }));
              navigate("/");
              setActiveLocalFilter(null)
            }} className={styles.headerFilterButton}>Top Clicks</button>
            <button onClick={() => {
              dispatch(setFilter({ filterType: "top votes", filterValue: "", currentPage: 1, pageSize: 20 }));
              navigate("/");
              setActiveLocalFilter(null)
            }} className={styles.headerFilterButton}>Top Votes</button>
          </>
        );
      case 'Country':
        return countries.length > 0 ? (
          countries.map((stationInfo) => (
            <button
              key={stationInfo.id}
              onClick={() => {
                dispatch(setFilter({ filterType: stationInfo.type, filterValue: stationInfo.title, currentPage: 1, pageSize: 20 }));
                navigate("/");
                setActiveLocalFilter(null)
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
                dispatch(setFilter({ filterType: stationInfo.type, filterValue: stationInfo.title, currentPage: 1, pageSize: 20 }));
                navigate("/");
                setActiveLocalFilter(null)
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
                dispatch(setFilter({ filterType: stationInfo.type, filterValue: stationInfo.title, currentPage: 1, pageSize: 20 }));
                navigate("/");
                setActiveLocalFilter(null)
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
            onMouseEnter={link.label !== 'All Stations' ? () => setActiveLocalFilter(link.label) : undefined}
            onMouseLeave={link.label !== 'All Stations' ? () => setActiveLocalFilter(null) : undefined}
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
            {activeLocalFilter === link.label && (
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
