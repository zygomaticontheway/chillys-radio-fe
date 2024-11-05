import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebounce } from 'use-debounce';
import styles from './header.module.css';
import { searchStations } from '../../features/stations/stationsActions';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../features/filter/filtersSlice';


const SearchFormHeader: React.FC = () => {
  const [searchTerm, setLocalSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.stationsResponse);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchStations({
        search: debouncedSearchTerm, page: 0, size: 20
      }));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    dispatch(setFilter({filterType: "search", filterValue: e.target.value, currentPage: 1, pageSize: 20}))
    navigate('/');
    console.log(searchTerm);
    
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
