import React from "react";
import { InfoGroup } from "./common/InfoGroup";

export const PersonInfo = ({ data }) => {
  return (
    <div className="hero-info">
      <h2 className="media-title">{data.name}</h2>
      {renderOverview(data)}
    </div>
  );
};

const renderOverview = ({ overview }) => {
  if (!overview) return null;
  return (
    <InfoGroup title="Overview">
      <p className="overview">{overview}</p>
    </InfoGroup>
  );
};
