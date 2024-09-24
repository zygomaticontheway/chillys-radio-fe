import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './TagsPage.module.css';
import { getTags } from '../services/api';

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTags();
      setTags(data);
    };
    fetchTags();
  }, []);

  return (
    <div className={styles.tagsPage}>
      <h2>Tags</h2>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link to={`/stations?tag=${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsPage;