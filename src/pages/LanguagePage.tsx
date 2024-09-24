import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LanguagePage.module.css';
import { getLanguages } from '../services/api';

const LanguagePage: React.FC = () => {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const data = await getLanguages();
      setLanguages(data);
    };
    fetchLanguages();
  }, []);

  return (
    <div className={styles.languagePage}>
      <h2>Languages</h2>
      <ul className={styles.languageList}>
        {languages.map((language) => (
          <li key={language}>
            <Link to={`/stations?language=${language}`}>{language}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagePage;