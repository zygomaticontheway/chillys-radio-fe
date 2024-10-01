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
        <Link to ={"/my-profile"} className={styles.navLink}>
        {user.name}
        </Link>
        <Link onClick={handleLogout} to='/login' className={styles.navLink}>Logout</Link>
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
