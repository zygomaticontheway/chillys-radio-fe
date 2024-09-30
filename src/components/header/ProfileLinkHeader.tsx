import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface ProfileLinkHeaderProps {
  user: { name: string } | null;
  handleLogout: () => void;
}

const ProfileLinkHeader: React.FC<ProfileLinkHeaderProps> = ({ user, handleLogout }) => {
  if (user?.name) {
    return (
      <div className={styles.rightAligned}>
        <span>{user.name}</span>
        <Link onClick={handleLogout} to='/login' className={styles.navLink}>Logout</Link>
      </div>
    );
  } else {
    return (
      <div className={styles.rightAligned}>
        <Link to="/login" className={`${styles.navLink} ${styles.profileLink}`}>
          <span className={styles.iconProfile}></span>
          Login/Register
        </Link>
      </div>
    );
  }
};

export default ProfileLinkHeader;