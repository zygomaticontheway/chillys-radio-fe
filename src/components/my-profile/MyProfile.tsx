import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Loader from '../loader/Loader';
import MyButton from '../myButton/MyButton';
import { getFavorites } from '../../features/favorites/favoritesAction';
import { getUserWithToken } from '../../features/auth/authActions';
import { logoutUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './myProfile.module.css';
import FavoriteStations from './FavoriteStations';
import PasswordChangeForm from '../user-change-password/ChangePasswordForm';
import { cleanFavorites } from '../../features/favorites/favoritesSlice';

const MyProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isFormVisible, setFormVisible] = useState(false);
    const { user, isLoading } = useAppSelector(state => state.user);

    const handleChangePasswordClick = () => {
        setFormVisible(!isFormVisible);
    };

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        if (token) {
            dispatch(getUserWithToken(token));
            dispatch(getFavorites());
        }
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('user-token');
        dispatch(logoutUser());
        dispatch(cleanFavorites());
        navigate('/');
    };

    if (isLoading) return <Loader />;

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className={styles.profileContainer}>
            <h2>My Profile</h2>
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
                <MyButton name="Change Password" onClick={handleChangePasswordClick} className={styles.button} />
                <MyButton name="Logout" onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`} />
            </div>
            {isFormVisible && (
                <div className='password-form-container'>
                    <PasswordChangeForm />
                </div>
            )}

            <div className={styles.favoriteStations}>
                <h3 className={styles.favoriteStationsTitle}>Your Favorite Stations</h3>
                <FavoriteStations />
            </div>
        </div>
    );
};

export default MyProfile;
