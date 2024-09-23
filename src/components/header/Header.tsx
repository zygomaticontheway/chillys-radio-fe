
import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom'
// import { links } from './links'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import { cleanProducts } from '../../features/stations/stationsSlice';
import { ActivePlayedHeader } from '../active-played-header/ActivePlayedHeader';

export default function Header() {


  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation()
  // console.log(links);

  const handleLogout = () => {
    //чистим браузерное хранилище данных
    localStorage.removeItem('user-token')

    //чистим state, выносим 'мусор' данных за пользователем
    dispatch(logoutUser())
    dispatch(cleanProducts())
  }

  return (

    <header className={styles.header}>
      {user.username && <span>{user.username}</span>}
      {user.username ? (
        <>
          <div className={styles.topLine}>
            <Link to="/" className={styles.logo}>Homepage</Link>
            <div className={styles.activeStation}>
              <ActivePlayedHeader />
            </div>
          </div>  

            <Link onClick={handleLogout} to='/login'>logout</Link>
          </>
          ) : (
          <div className={styles.rightAligned}>
            <Link to="/login" className={`${styles.navLink} ${styles.profileLink}`}>
              <span className={styles.iconProfile}></span>
              Login/Register
            </Link>
          </div>
        )}

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
