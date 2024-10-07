
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getHeaderCountries, getHeaderLanguages, getHeaderTags } from '../../features/tags/headerTagsAction';
import { filteredStations, getStations, getTopClicksStations, getTopVotesStations } from '../../features/stations/stationsActions';

interface FiltersHeaderProps {
  headerLinks: Array<{ path: string; label: string }>;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ headerLinks }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector(state => state.tags);
  const { countries } = useAppSelector(state => state.countries);
  const { languages } = useAppSelector(state => state.languages);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getHeaderTags());
    dispatch(getHeaderCountries());
    dispatch(getHeaderLanguages());
  }, [dispatch]);

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
              dispatch(getTopClicksStations({page: 1, size: 20}));
              navigate("/");
            } 
            } className={styles.headerFilterButton}>Top Clicks</button>
            <button onClick={() => { dispatch(getTopVotesStations({page: 1, size: 20}))
            navigate("/");
          }
          } className={styles.headerFilterButton}>Top Votes</button>
          </>
        );
      case 'Country':
        return countries ? (
          Object.entries(countries)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([country]) => (
              <button key={country} onClick={() => {dispatch(filteredStations({
                page: 1, size: 20,
                name: '',
                tags: '',
                country: country,
                language: ''
              }));
              navigate("/");
          }
            } className={styles.headerFilterButton}>{country}</button>
            ))
        ) : (
          <p>Loading countries...</p>
        );
      case 'Language':
        return languages ? (
          Object.entries(languages)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([language]) => (
              <button key={language} onClick={() => {dispatch(filteredStations({
                page: 1, size: 20,
                name: '',
                tags: '',
                country: '',
                language: language
              }));
              navigate("/");
            }} className={styles.headerFilterButton}>{language}</button>
            ))
        ) : (
          <p>Loading languages...</p>
        );
      case 'Tags':
        return tags ? (
          Object.entries(tags)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([tag]) => (
              <button key={tag} onClick={() => {dispatch(filteredStations({
                page: 1, size: 20,
                name: '',
                tags: tag,
                country: '',
                language: ''
              }));
              navigate("/");
            }} className={styles.headerFilterButton}>{tag}</button>
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