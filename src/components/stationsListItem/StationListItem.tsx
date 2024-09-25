import React from "react"
import { IStation } from "../../types/interfaces"

interface StationListItemProps {
  station: IStation
  onClick: (station: IStation) => void
}

const StationListItem: React.FC<StationListItemProps> = ({
  station,
  onClick,
}) => {
  return (
    <div className="station-item" onClick={() => onClick(station)}>
      <div className="station-item-content">
        <img
          src={station.favicon || "default-station-icon.png"}
          alt={station.name}
          className="station-icon"
        />
        <div className="station-info">
          <h4 className="station-name">{station.name}</h4>
          <p className="station-details">
            {station.country} | {station.language}
          </p>
          <p className="station-tags">{station.tags}</p>
        </div>
      </div>
      <div className="station-meta">
        <span className="station-bitrate">{station.bitrate} kbps</span>
        <span className="station-votes">{station.votes} votes</span>
      </div>
    </div>
  )
}

export default StationListItem
