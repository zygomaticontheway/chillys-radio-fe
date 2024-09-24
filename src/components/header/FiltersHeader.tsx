import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface FiltersHeaderProps {
  headerLinks: Array<{ path: string; label: string }>;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({ headerLinks }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {headerLinks.map((link) => (
          <li key={link.path} className={styles.navItem}>
            <Link to={link.path} className={styles.navLink}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FiltersHeader;