import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Loader from '../loader/Loader';
import MyButton from '../myButton/MyButton';
import styles from './myProfile.module.css';
import { getUserWithToken } from '../../features/auth/authActions';
import { logoutUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const MyProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useAppSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      dispatch(getUserWithToken(token));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('user-token');
    dispatch(logoutUser());
    navigate('/');
  };

  if (isLoading) return <Loader />;

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>My profile</h2>
      <div className={styles.userDetails}>
        <div className={styles.profileField}>
          <label>Username:</label>
          <div className={styles.profileValue}>
            {user.name || ''}
          </div>
        </div>
        <div className={styles.profileField}>
          <label>Email:</label>
          <div className={styles.profileValue}>
            {user.email || ''}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <MyButton name="Change Password" onClick={() => console.log('Change Password')} className={styles.button} />
        <MyButton name="Logout" onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`} />
      </div>

      <div className={styles.favoriteStations}>Favorite Stations will be here</div>
    </div>
  );
};

export default MyProfile;


