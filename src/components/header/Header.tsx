import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
  
      <div className={styles.topLine}>
        <Link to="/" className={styles.logo}>Homepage</Link>
        <div className={styles.activeStation}>
          
        </div>
        <div className={styles.rightAligned}>
          <Link to="/login" className={`${styles.navLink} ${styles.profileLink}`}>
            <span className={styles.iconProfile}></span>
            Login/Register
          </Link>
        </div>
      </div>

     
      <div className={styles.separator}></div>

      
      <div className={styles.bottomLine}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/top-stations" className={styles.navLink}>Top Stations</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/country" className={styles.navLink}>Country</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/language" className={styles.navLink}>Language</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/tags" className={styles.navLink}>Tags</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.rightAligned}>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
      </div>
    </header>
  );
};

export default Header;