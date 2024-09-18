
import styles from './header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { links } from './links'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutUser } from '../../features/auth/authSlice';
import { cleanProducts } from '../../features/products/productsSlice';

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
            {links.map((el, index) => (
              <Link key={index} className={location.pathname === el.pathname ? styles.active : ''} to={el.pathname}>{el.title}</Link>
            ))}
            <Link onClick={handleLogout} to='/login'>logout</Link>
          </>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </header>
  )
}

//       function userAppSelector() {
//   throw new Error('Function not implemented.')
// }
