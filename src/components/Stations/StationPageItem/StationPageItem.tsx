// src/components/StationPageItem.tsx
import React from 'react';

import styles from './StationPageItem.module.css';
import PlayPauseButton from '../../common/PlayPauseButton/PlayPauseButton';
import TagsLink from '../../common/TagsLink/TagsLink';

interface Station {
  id: string;
  name: string;
  description: string;
  votes: number;
  clicks: number;
  tags: string[];
}

interface StationPageItemProps {
  station: Station;
}

const StationPageItem: React.FC<StationPageItemProps> = ({ station }) => {
  return (
    <div className={styles.pageItem}>
      <h1>{station.name}</h1>
      <PlayPauseButton />
      <p>{station.description}</p>
      <p>Votes: {station.votes} | Clicks: {station.clicks}</p>
      <TagsLink tags={station.tags} />
    </div>
  );
};

export default StationPageItem;
