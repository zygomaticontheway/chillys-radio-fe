import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryPage.module.css';
import { getCountries } from '../services/api';

const CountryPage: React.FC = () => {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  return (
    <div className={styles.countryPage}>
      <h2>Countries</h2>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <li key={country}>
            <Link to={`/stations?country=${country}`}>{country}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryPage;