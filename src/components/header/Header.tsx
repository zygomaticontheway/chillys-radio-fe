
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { homeLink } from './links';
import ActivePlayedHeader from '../active-played-header/ActivePlayedHeader';
import ProfileLinkHeader from './ProfileLinkHeader';
import FiltersHeader from './FiltersHeader';
import SearchFormHeader from './SearchFormHeader';

    export default function Header() {
    
      return (
        <header className={styles.header}>
          <div className={styles.topLine}>
            <Link to={homeLink.path}><img src="/media/logo.png" alt={homeLink.label} className={styles.logo} aria-label="Home"/></Link>
            <div className={styles.activeStationWrapper}>
              <ActivePlayedHeader />
            </div>
            <ProfileLinkHeader />
          </div>
    
          <div className={styles.separator}></div>
    
          <div className={styles.bottomLine}>
            <FiltersHeader/>
            <SearchFormHeader />
          </div>
        </header>
      );
    }
  