
import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { headerLinks, userLinks, homeLink } from './links';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import { cleanStations } from '../../features/stations/stationsSlice';
import { ActivePlayedHeader } from '../active-played-header/ActivePlayedHeader';

  
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
          {user.username && <span>{user.username}</span>}
          {user.username ? (
            <>
              <div className={styles.topLine}>
                <Link to={homeLink.path} className={styles.logo}>{homeLink.label}</Link>
                <div className={styles.activeStation}>
                  <ActivePlayedHeader />
                </div>
              </div>  
              <Link onClick={handleLogout} to={userLinks.find(link => link.label === 'Logout')?.path || '/login'}>
                {userLinks.find(link => link.label === 'Logout')?.label || 'Logout'}
              </Link>
            </>
          ) : (
            <div className={styles.rightAligned}>
              <Link to={userLinks.find(link => link.label === 'Login/Register')?.path || '/login'} 
                    className={`${styles.navLink} ${styles.profileLink}`}>
                <span className={styles.iconProfile}></span>
                {userLinks.find(link => link.label === 'Login/Register')?.label || 'Login/Register'}
              </Link>
            </div>
          )}
    
          <div className={styles.separator}></div>
    
          <div className={styles.bottomLine}>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {headerLinks.map((link) => (
                  <li key={link.path} className={styles.navItem}>
                    <Link to={link.path} className={styles.navLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.rightAligned}>
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>
          </div>
        </header>
      );
    }
  