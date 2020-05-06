import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    currentMovie: {
      data: null,
      isLoading: false,
    },
    meta: {},
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    moviesRequested: (movies, action) => {
      movies.isLoading = true;
    },
    moviesReceived: (movies, action) => {
      movies.list = action.payload.results.map((movie) => ({
        id: movie.id,
        name: movie.title,
        released: movie.release_date,
        rating: movie.vote_average,
        overview: movie.overview,
        poster: movie.poster_path,
      }));
      movies.meta = {
        page: action.payload.page,
        total_results: action.payload.total_results,
        total_pages: action.payload.total_pages,
      };
      movies.isLoading = false;
      movies.lastFetch = Date.now();
    },
    moviesRequestFailed: (movies, action) => {
      movies.isLoading = false;
    },
    singularMovieRequested: (movies, action) => {
      movies.currentMovie.isLoading = true;
    },
    singularMovieReceived: (movies, action) => {
      const { payload: movie } = action;
      movies.currentMovie.data = {
        id: movie.id,
        name: movie.title,
        tagline: movie.tagline,
        overview: movie.overview,
        rating: movie.vote_average,
        released: movie.release_date,
        genres: movie.genres,
        backdrop: movie.backdrop_path,
        poster: movie.poster_path,
        collection: movie.belongs_to_collection,
        cast: movie.credits.cast,
        similar: movie.similar.results.map((row) => ({
          id: row.id,
          name: row.title,
          released: row.release_date,
          rating: row.vote_average,
          overview: row.overview,
          image: row.poster_path,
        })),
      };
      movies.currentMovie.isLoading = false;
    },
    singularMovieRequestFailed: (movies, action) => {
      movies.currentMovie.isLoading = false;
    },
    setCurrentMovie: (movies, action) => {
      movies.currentMovie.data = action.payload;
      movies.currentMovie.isLoading = false;
    },
  },
});

const url = "/discover/movie";

export const loadMovies = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.movies;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: moviesRequested.type,
      onSuccess: moviesReceived.type,
      onError: moviesRequestFailed.type,
    })
  );
};

export const loadSingularMovie = (movieId) => async (dispatch, getState) => {
  const { movies: moviesViewed } = getState().viewed;
  const movie =
    moviesViewed && moviesViewed.filter((movie) => movie.id == movieId);
  if (movie.length) return dispatch(setCurrentMovie(movie[0]));
  await dispatch(
    apiCallBegan({
      url: `/movie/${movieId}`,
      params: {
        append_to_response: "credits,similar",
      },
      onStart: singularMovieRequested.type,
      onSuccess: singularMovieReceived.type,
      onError: singularMovieRequestFailed.type,
    })
  );
};

const {
  moviesRequested,
  moviesReceived,
  moviesRequestFailed,
  singularMovieReceived,
  singularMovieRequested,
  singularMovieRequestFailed,
  setCurrentMovie,
} = slice.actions;
export default slice.reducer;
