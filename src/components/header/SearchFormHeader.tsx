import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebounce } from 'use-debounce';
import styles from './header.module.css';
import { searchStations } from '../../features/stations/stationsActions';
import { useNavigate } from 'react-router-dom';

const SearchFormHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.stationsResponse);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchStations({
        search: debouncedSearchTerm, page: 0, size: 20
      }));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    navigate('/');
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
