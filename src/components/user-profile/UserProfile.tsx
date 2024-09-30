// import React, { useState } from 'react';
// import { useAppSelector } from '../../redux/hooks';
// import Loader from '../loader/Loader';
// import FavoriteStations from './FavoriteStations';
// import MyButton from '../myButton/MyButton';
// import styles from './userProfile.module.css'; 

// const UserProfile: React.FC = () => {
//   const { user, isLoading } = useAppSelector(state => state.user);
//   const { favoriteStations } = useAppSelector(state => state.stations);

//   if (isLoading) return <Loader />;

//   // Добавляем проверку на наличие user
//   if (!user) {
//     return <div>No user data available</div>;
//   }

//   return (
//     <div className={styles.profileContainer}>
//       <h2>Profile</h2>
//       <div className={styles.userDetails}>
//         <div className={styles.profileField}>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={user.username || ''} // Плейсхолдер для username
//             placeholder="Enter your username"
//             readOnly // Можно использовать, если не нужно редактирование
//           />
//         </div>
//         <div className={styles.profileField}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={user.email || ''} // Плейсхолдер для email
//             placeholder="Enter your email"
//             readOnly // Можно использовать, если не нужно редактирование
//           />
//         </div>
//       </div>
//       <div className={styles.actions}>
//         <MyButton name="Change Password" onClick={() => console.log('Change Password')} />
//         <MyButton name="Logout" onClick={() => console.log('Logout')} />
//       </div>
//       <div className={styles.favoriteStations}>
//         <h3>Your Favorite Stations</h3>
//         <FavoriteStations stations={favoriteStations} />
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import Loader from '../loader/Loader';
import FavoriteStations from './FavoriteStations';
import MyButton from '../myButton/MyButton';
import styles from './userProfile.module.css'; // Подключаем стили

const UserProfile: React.FC = () => {
  const { user, isLoading } = useAppSelector(state => state.user);
  const { favoriteStations } = useAppSelector(state => state.stations);

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
          <input
            type="text"
            value={user.username || ''}
            placeholder=" "
            readOnly
          />
        </div>
        <div className={styles.profileField}>
          <label>Email:</label>
          <input
            type="email"
            value={user.email || ''}
            placeholder=" "
            readOnly
          />
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
