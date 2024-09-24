import React, { useState, useEffect } from 'react';
import { getAllStationsPaginated } from '../../../services/api';
import { Station } from '../../../types/station';

const StationsContainer: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [totalStations, setTotalStations] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAllStationsPaginated(page, size);
        setStations(data.stations);
        setTotalStations(data.total);
      } catch (error) {
        console.error('Error fetching stations:', error);
        setError('Failed to fetch stations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStations();
  }, [page, size]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All stations</h2>
      <p>{totalStations} stations worldwide</p>
      {stations.map(station => (
        <div key={station.stationuuid}>{station.name}</div>
      ))}
    </div>
  );
};

export default StationsContainer;