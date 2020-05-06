import React from "react";
import { Image } from "../common/Image";

export const SeasonCard = ({ row }) => {
  return (
    <div className="flex-card">
      <Image small type="poster" src={row.poster_path} alt={row.name} flex />
      <div className="card-info">
        <h3 className="title">{row.name}</h3>
        <div className="group" style={{ display: "flex" }}>
          <div className="group">
            <div className="sub-title dark">Episodes</div>
            <div>{row.episode_count}</div>
          </div>
          <div className="group">
            <div className="sub-title dark">Air Date</div>
            <div>{row.air_date}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
