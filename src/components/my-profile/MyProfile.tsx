

// import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import Loader from '../loader/Loader';
// import FavoriteStations from './FavoriteStations';
// import MyButton from '../myButton/MyButton';
// import StationFilters from '../../components/stations-contatiner/StationsFilters';  // Подключение фильтров
// import FavoriteHeart from '../../components/favorites/FavoriteHeart';    // Подключение избранного
// import styles from './myProfile.module.css';
// import { getUserWithToken } from '../../features/auth/authActions';
// import { logoutUser } from '../../features/auth/authSlice';
// import { getFavorites } from '../../features/favorites/favoritesAction';  // Получение избранных станций
// import { useNavigate } from 'react-router-dom'; 
// import { IStation } from '../../types/interfaces';
// import React, { useEffect, useState } from 'react';


// const MyProfile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate(); 
//   const { user, isLoading } = useAppSelector(state => state.user);
//   const { favoriteStations } = useAppSelector(state => state.favorites);  // Используем избранные станции из redux
//   const [filteredStations, setFilteredStations] = useState(favoriteStations);  // Состояние для фильтрованных станций

//   useEffect(() => {
//     const token = localStorage.getItem('user-token');
//     if (token) {
//       dispatch(getUserWithToken(token));
//       dispatch(getFavorites());  // Запрашиваем избранные станции при загрузке
//     }
//   }, [dispatch]);

//   const handleLogout = () => {
//     localStorage.removeItem('user-token');
//     dispatch(logoutUser());
//     navigate('/');
//   };

//   // Обновление отфильтрованных станций
//   const handleFilterChange = (filteredStations: IStation[]) => {
//     setFilteredStations(filteredStations);
//   };

//   if (isLoading) return <Loader />;

//   if (!user) {
//     return <div>No user data available</div>;
//   }

//   return (
//     <div className={styles.profileContainer}>
//       <h2>My profile</h2>
//       <div className={styles.userDetails}>
//         <div className={styles.profileField}>
//           <label>Username:</label>
//           <div className={styles.profileValue}>
//             {user.name || ''}
//           </div>
//         </div>
//         <div className={styles.profileField}>
//           <label>Email:</label>
//           <div className={styles.profileValue}>
//             {user.email || ''}
//           </div>
//         </div>
//       </div>

//       <div className={styles.actions}>
//         <MyButton name="Change Password" onClick={() => console.log('Change Password')} className={styles.button} />
//         <MyButton name="Logout" onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`} />
//       </div>

//       <div className={styles.favoriteStations}>
//         <h3>Your Favorite Stations</h3>
//         <StationFilters stations={favoriteStations} onFilterChange={handleFilterChange} />  {/* Добавляем фильтры */}
//         {filteredStations.length > 0 ? (
//           <FavoriteStations stations={filteredStations} />  {/* Отображаем фильтрованные станции */}
//         ) : (
//           <p>No favorite stations available</p>
//         )}
//         {/* Добавляем функционал добавления в избранное */}
//         {filteredStations.map(station => (
//           <div key={station.stationuuid} className={styles.stationItem}>
//             <p>{station.name}</p>
//             <FavoriteHeart station={station} />  {/* Кнопка избранного */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;



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

      
      <div className={styles.favoriteStations}>
      <h3>Your Favorite Stations</h3>
      </div>
    </div>
  );
};

export default MyProfile;