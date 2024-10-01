import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { countries, languages, tags } from '../data/filterData';

interface FiltersHeaderProps {
  headerLinks: Array<{ path: string; label: string }>;
}

const FiltersHeader: React.FC<FiltersHeaderProps>
 = ({ headerLinks }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
        return countries.map(country => (
          <Link key={country} to={`/country/${country.toLowerCase()}`}>{country}</Link>
        ));
      case 'Language':
        return languages.map(language => (
          <Link key={language} to={`/language/${language.toLowerCase()}`}>{language}</Link>
        ));
      case 'Tags':
        return tags.map(tag => (
          <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>{tag}</Link>
        ));
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