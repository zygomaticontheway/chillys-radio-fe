import React from 'react';

import styles from './HomePage.module.css';
import StationsContainer from '../components/Stations/StationsContainer/StationsContainer';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={`${styles.fontBold} ${styles.textColor}`}>The Chillys Radio</h1>
      <p className={styles.textColor}>Listen to radio stations worldwide for free</p>
      <StationsContainer />
    </div>
  );
};

export default HomePage;