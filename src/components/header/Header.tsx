
import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { headerLinks, userLinks, homeLink } from './links';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import { cleanStations } from '../../features/stations/stationsSlice';
import ActivePlayedHeader from '../active-played-header/ActivePlayedHeader';
import ProfileLinkHeader from './ProfileLinkHeader';
import FiltersHeader from './FiltersHeader';
import SearchFormHeader from './SearchFormHeader';


  
    export default function Header() {
      const { user } = useAppSelector(state => state.user);
      const dispatch = useAppDispatch();
      const location = useLocation();
    
      const handleLogout = () => {
        localStorage.removeItem('user-token');
        dispatch(logoutUser());
        dispatch(cleanStations());
      }
    
      return (
        <header className={styles.header}>
          <div className={styles.topLine}>
            <Link to={homeLink.path} className={styles.logo}>{homeLink.label}</Link>
            <div className={styles.activeStation}>
              <ActivePlayedHeader />
            </div>
            <ProfileLinkHeader user={user} handleLogout={handleLogout} />
          </div>
    
          <div className={styles.separator}></div>
    
          <div className={styles.bottomLine}>
            <FiltersHeader headerLinks={headerLinks} />
            <SearchFormHeader />
          </div>
        </header>
      );
    }
  