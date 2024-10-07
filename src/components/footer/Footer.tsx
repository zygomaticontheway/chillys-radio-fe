import React from 'react';

import styles from './footer.module.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.footerList}>
          <li className={styles.footerItem}>
            <Link to="/about" className={styles.footerLink}>About Us</Link>
          </li>
          <li className={styles.footerItem}>
            <Link to="/" className={styles.footerLink}>Contacts</Link>
          </li>
        </ul>
      </nav>
      <p>&copy; 2024 The Chillys team</p>
    </footer>
  );
};

export default Footer;
