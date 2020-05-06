import React from "react";
import { Image } from "./common/Image";
import { Link } from "react-router-dom";
import { HorizontalList } from "./common/HorizontalList";

export const CastList = ({ cast }) => {
  if (!cast) return null;
  return (
    <div className="root">
      <section className="section">
        <h3 className="section-title">Cast</h3>
        <HorizontalList data={cast} component={Card} />
      </section>
    </div>
  );
};

const Card = ({ row }) => {
  return (
    <Link to={`/person/${row.id}`}>
      <Image
        rounded
        type="poster"
        src={row.profile_path || row.poster_path}
        alt={row.name || row.title}
      />
      <div className="card-info">
        <div className="person-name">{row.name}</div>
        <div className="character-name">{row.character}</div>
      </div>
    </Link>
  );
};
