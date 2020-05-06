import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../common/Image";
import { ratingPercent } from "../../helpers/helper";

export const CreditsCard = ({ row }) => {
  return (
    <Link to={`/${row.media_type}/${row.id}`}>
      <Image
        src={row.poster_path}
        type="poster"
        alt={row.name || row.title}
        flex
        small
      />
      <div className="card-info">
        <h3 className="title">{row.name || row.title}</h3>
        <div className="group" style={{ display: "flex" }}>
          <div className="group">
            <div className="sub-title dark">Rating</div>
            <div className="rating">{ratingPercent(row.vote_average)}</div>
          </div>
          <div className="group">
            <div className="sub-title dark">Released</div>
            <time dateTime={row.release_date || row.first_air_date}>
              {row.release_date || row.first_air_date}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
};
