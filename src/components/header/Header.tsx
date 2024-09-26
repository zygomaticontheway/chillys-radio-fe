
import styles from './header.module.css'
import { Link } from 'react-router-dom'
import { headerLinks, homeLink } from './links';
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
    
      const handleLogout = () => {
        localStorage.removeItem('user-token');
        dispatch(logoutUser());
        dispatch(cleanStations());
      }
    
      return (
        <header className={styles.header}>
          <div className={styles.topLine}>
            <Link to={homeLink.path} ><img src="src/media/logo.png" alt={homeLink.label} className={styles.logo}/></Link>
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
  