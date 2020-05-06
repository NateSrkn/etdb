import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../common/Image";

export const MediaCard = ({ row, type }) => {
  return (
    <Link to={`/${type}/${row.id}`}>
      <Image rounded type="poster" src={row.poster} alt={row.name} />
    </Link>
  );
};
