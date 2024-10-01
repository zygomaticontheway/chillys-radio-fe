import React from 'react';
import { IStation } from '../../types/interfaces';
import { IFavoriteStations } from '../../types/interfaces';

const FavoriteStations: React.FC<IFavoriteStations> = ({ stations = [] }) => {
  return (
    <div>
      {stations.length === 0 ? (
        <div>No favorite stations available.</div>
      ) : (
        stations.map((station: IStation) => (
          <div key={station.stationuuid}>
            <img src={station.favicon} alt={station.name} />
            <h4>{station.name}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoriteStations;


