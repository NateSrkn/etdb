import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop } from "../components/common/Backdrop";
import { HeroBanner } from "../components/HeroBanner";
import { ExtraInfo } from "../components/ExtraInfo";
import { loadSingularShow } from "../store/types/shows";
import { loadSingularMovie } from "../store/types/movies";
import { addMovieToViewed, addShowToViewed } from "../store/types/viewed";
import { MediaInfo } from "../components/MediaInfo";

export const MediaPage = () => {
  let { movieId, tvId } = useParams();
  const type = movieId ? "movie" : "tv";
  const dispatch = useDispatch();
  let data = useSelector((state) =>
    movieId
      ? state.entities.movies.currentMovie.data
      : state.entities.shows.currentShow.data
  );

  useEffect(() => {
    scrollToTop();
    dispatch(movieId ? loadSingularMovie(movieId) : loadSingularShow(tvId));

    return () => {
      dispatch(movieId ? addMovieToViewed() : addShowToViewed());
    };
  }, [dispatch, movieId, tvId]);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  if (!data) return null;
  return (
    <React.Fragment>
      <Backdrop backdrop={data.backdrop}>
        <HeroBanner data={data}>
          <MediaInfo data={data} />
        </HeroBanner>
      </Backdrop>
      <ExtraInfo data={data} type={type} />
    </React.Fragment>
  );
};
