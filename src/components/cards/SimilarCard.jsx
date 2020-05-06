import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../common/Image";
import { ratingPercent } from "../../helpers/helper";

export const SimilarCard = ({ row, type }) => {
  return (
    <Link to={`/${type}/${row.id}`} style={{ display: "flex" }}>
      <Image small src={row.image} type="poster" alt={row.name} flex />
      <div className="card-info">
        <h3 className="title">{row.name}</h3>
        <div className="group" style={{ display: "flex" }}>
          <div className="group">
            <div className="sub-title dark">Rating</div>
            <div>{ratingPercent(row.rating)}</div>
          </div>
          <div className="group">
            <div className="sub-title dark">Release Date</div>
            <div>{row.released}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
