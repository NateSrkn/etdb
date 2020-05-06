import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../store/types/movies";
import { loadShows } from "../store/types/shows";
import { HorizontalList } from "./common/HorizontalList";
import { MediaCard } from "./cards/MediaCard";

export const MediaList = ({ type }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) =>
    type === "movie" ? state.entities.movies.list : state.entities.shows.list
  );
  useEffect(() => {
    dispatchSelector();
  });

  const dispatchSelector = () => {
    if (type === "movie") {
      dispatch(loadMovies());
    }
    dispatch(loadShows());
  };

  return (
    <div className="media-list">
      <h3 className="media-list-header">
        {type === "movie" ? "Movies" : "Shows"}
      </h3>
      <HorizontalList data={data} component={MediaCard} type={type} />
    </div>
  );
};
