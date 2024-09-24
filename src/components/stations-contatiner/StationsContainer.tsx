import React from "react";
import { IStation, IStationResponse } from "../../types/interfaces";
import { useDispatch } from "react-redux";
import { setActiveStation } from "../../features/stations/setPlayingStationSlice";
import { useNavigate } from "react-router-dom";


  
  const StationList: React.FC<IStationResponse> = ({ stations }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleStationClick = (station: IStation) => {
      dispatch(setActiveStation(station));  // Устанавливаем активную радиостанцию
      navigate(`/station/${station.stationuuid}`);  // Перенаправляем на страницу станции
    };
  
    return (
      <div className="station-list">
        {stations.map((station) => (
          <div key={station.stationuuid} className="station-item" onClick={() => handleStationClick(station)}>
            <img src={station.favicon} alt={station.name} className="station-icon" />
            <h4>{station.name}</h4>
          </div>
        ))}
      </div>
    );
  };
  
  export default StationList;