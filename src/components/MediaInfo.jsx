import React from "react";
import { InfoGroup } from "./common/InfoGroup";
import { ratingPercent } from "../helpers/helper";
import { Button } from "./common/Button";

export const MediaInfo = ({ data }) => {
  return (
    <div className="hero-info">
      {data.tagline && <div className="sub-title">{data.tagline}</div>}
      <h2 className="media-title">{data.name}</h2>
      <div className="group" style={{ display: "flex" }}>
        {renderRating(data)}
        {renderReleaseDate(data)}
      </div>
      {renderGenres(data)}
      <InfoGroup title="Overview">
        <p className="overview">{data.overview}</p>
      </InfoGroup>
      {renderSeasonInfo(data)}
      {renderCreators(data.creators)}
      {renderCollection(data.collection)}
    </div>
  );
};
const renderGenres = ({ genres }) => {
  if (!genres) return null;
  return (
    <InfoGroup title="Genre">
      <div>{genres && genres.map((row) => row.name).join(", ")}</div>
    </InfoGroup>
  );
};
const renderReleaseDate = ({ released }) => {
  if (!released) return null;
  return (
    <InfoGroup title="Release Date">
      <time dateTime={released}>{released}</time>
    </InfoGroup>
  );
};
const renderRating = ({ rating }) => {
  if (!rating) return null;
  return (
    <InfoGroup title="Rating">
      <div>{ratingPercent(rating)}</div>
    </InfoGroup>
  );
};
const renderSeasonInfo = ({ seasons, next_episode, last_episode }) => {
  if (!seasons) return null;
  return (
    <InfoGroup style={{ display: "flex" }}>
      <InfoGroup title="Seasons">
        <div>{seasons.length}</div>
      </InfoGroup>
      <InfoGroup title="Last Episode">{last_episode.air_date}</InfoGroup>
      {next_episode && (
        <InfoGroup title="Next Episode">{next_episode.air_date}</InfoGroup>
      )}
    </InfoGroup>
  );
};

const renderCreators = (creators) => {
  if (!creators || !creators.length) return null;
  return (
    <InfoGroup title="Created by">
      <div>{creators.map((creator) => creator.name).join(", ")}</div>
    </InfoGroup>
  );
};

const renderCollection = (collection) => {
  if (!collection) return null;
  return (
    <Button link={`/collection/${collection.id}`}>{collection.name}</Button>
  );
};
