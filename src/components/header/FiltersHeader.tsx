
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getHeaderCountries, getHeaderLanguages, getHeaderTags } from '../../features/tags/headerTagsAction';

interface FiltersHeaderProps {
  headerLinks: Array<{ path: string; label: string }>;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ headerLinks }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector(state => state.tags);
  const { countries } = useAppSelector(state => state.countries);
  const { languages } = useAppSelector(state => state.languages);

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

  const renderFilterContent = (label: string) => {
    switch (label) {
      case 'Top Stations':
        return (
          <>
            <Link to="/top-stations/clicks">Top clicks</Link>
            <Link to="/top-stations/votes">Top votes</Link>
          </>
        );
      case 'Country':
        return countries ? (
          Object.entries(countries)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([country, count]) => (
              <Link key={country} to={`/country/${country.toLowerCase()}`}>
                {country} ({count})
              </Link>
            ))
        ) : (
          <p>Loading countries...</p>
        );
      case 'Language':
        return languages ? (
          Object.entries(languages)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([language, count]) => (
              <Link key={language} to={`/language/${language.toLowerCase()}`}>
                {language} ({count})
              </Link>
            ))
        ) : (
          <p>Loading languages...</p>
        );
      case 'Tags':
        return tags ? (
          Object.entries(tags)
            .sort((a, b) => (b[1] as number) - (a[1] as number))
            .slice(0, 49)
            .map(([tag, count]) => (
              <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
                {tag} ({count})
              </Link>
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
            onMouseEnter={() => handleMouseEnter(link.label)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={link.path} className={styles.navLink}>
              {link.label}
            </Link>
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
