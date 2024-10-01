
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Loader from '../loader/Loader';
import FavoriteStations from './FavoriteStations';
import MyButton from '../myButton/MyButton';
import styles from './userProfile.module.css';
import { getUserWithToken } from '../../features/auth/authActions'; 

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.user);
  const { favoriteStations } = useAppSelector(state => state.stations);

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      dispatch(getUserWithToken(token));
    }
  }, [dispatch]);

  if (isLoading) return <Loader />;

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Profile</h2>
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
        <MyButton name="Change Password" onClick={() => console.log('Change Password')} />
        <MyButton name="Logout" onClick={() => console.log('Logout')} className={styles.logoutButton} />
      </div>

      <div className={styles.favoriteStations}>
        <h3>Your Favorite Stations</h3>
        <FavoriteStations stations={favoriteStations} />
      </div>
    </div>
  );
};

export default UserProfile;
