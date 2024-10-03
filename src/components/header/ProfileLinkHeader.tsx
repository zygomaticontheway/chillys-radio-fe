import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Для получения состояния из Redux
import { RootState } from '../../redux/store'; // Импортируйте тип состояния
import styles from './header.module.css';

interface ProfileLinkHeaderProps {
  handleLogout: () => void;
}

const ProfileLinkHeader: React.FC<ProfileLinkHeaderProps> = ({ handleLogout }) => {
  
  // Получаем данные пользователя из Redux
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user?.name) {
      console.log(`Пользователь авторизован: ${user.name}`);
    } else {
      console.log('Пользователь не авторизован');
    }
  }, [user]); // Следим за изменением user

  // Возвращаем JSX из компонента
  if (user?.name) {
    return (
      <div className={styles.rightAligned}>
        <Link to="/my-profile" className={styles.navLink}>
          {user.name}
        </Link>
        <Link onClick={handleLogout} to='/' className={styles.navLink}>
          Logout
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles.rightAligned}>
        <Link to="/login" className={`${styles.navLink} ${styles.profileLink}`}>
          <span className={styles.iconProfile}></span>
          Login
        </Link>
        <Link to="/register" className={`${styles.navLink} ${styles.profileLink}`}>
          <span className={styles.iconProfile}></span>
          Register
        </Link>
      </div>
    );
  }
};

export default ProfileLinkHeader;
