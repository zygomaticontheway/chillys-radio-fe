import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebounce } from 'use-debounce';
import { searchStations } from '../../features/stations/stationsSlice';
import styles from './header.module.css';

const SearchFormHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.stations);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchStations({ name: debouncedSearchTerm, page: 0, size: 20 }));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.rightAligned}>
      <input 
        type="text" 
        placeholder="Search" 
        className={styles.searchInput} 
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isLoading && <span>Loading...</span>}
      {error && <span>Error: {error}</span>}
    </div>
  );
};

export default SearchFormHeader;
