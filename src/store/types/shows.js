import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "shows",
  initialState: {
    list: [],
    currentShow: {
      data: null,
      isLoading: false,
    },
    meta: {},
    loading: false,
    lastFetch: false,
  },
  reducers: {
    showsRequested: (shows, action) => {
      shows.loading = true;
    },
    showsReceived: (shows, action) => {
      shows.list = action.payload.results.map((show) => ({
        id: show.id,
        name: show.name,
        released: show.first_air_date,
        rating: show.vote_average,
        overview: show.overview,
        poster: show.poster_path,
      }));
      shows.meta = {
        page: action.payload.page,
        total_results: action.payload.total_results,
        total_pages: action.payload.total_pages,
      };
      shows.loading = false;
      shows.lastFetch = Date.now();
    },
    setCurrentShow: (shows, action) => {
      shows.currentShow.data = action.payload;
      shows.currentShow.isLoading = false;
    },
    showsRequestFailed: (shows, action) => {
      shows.loading = false;
    },
    singularShowRequested: (shows, action) => {
      shows.currentShow.isLoading = true;
    },
    singularShowReceived: (shows, action) => {
      const { payload: show } = action;
      shows.currentShow.data = {
        id: show.id,
        name: show.name,
        tagline: show.tagline,
        overview: show.overview,
        rating: show.vote_average,
        released: show.first_air_date,
        genres: show.genres,
        backdrop: show.backdrop_path,
        poster: show.poster_path,
        creators: show.created_by,
        cast: show.credits.cast,
        crew: show.credits.crew,
        seasons: show.seasons,
        networks: show.networks,
        similar: show.similar.results.map((row) => ({
          id: row.id,
          name: row.name,
          released: row.first_air_date,
          rating: row.vote_average,
          overview: row.overview,
          image: row.poster_path,
        })),
        last_episode: show.last_episode_to_air,
        next_episode: show.next_episode_to_air,
      };
    },
    singularShowRequestFailed: (shows, action) => {
      shows.currentShow.isLoading = false;
    },
  },
});

const url = "/discover/tv";

export const loadShows = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.shows;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      onStart: showsRequested.type,
      onSuccess: showsReceived.type,
      onError: showsRequestFailed.type,
    })
  );
};

export const loadSingularShow = (tvId) => async (dispatch, getState) => {
  const { shows: showsViewed } = getState().viewed;
  const show = showsViewed && showsViewed.filter((show) => show.id == tvId);
  if (show.length) return dispatch(setCurrentShow(show[0]));
  await dispatch(
    apiCallBegan({
      url: `/tv/${tvId}`,
      params: {
        append_to_response: "credits,similar",
      },
      onStart: singularShowRequested.type,
      onSuccess: singularShowReceived.type,
      onError: singularShowRequestFailed.type,
    })
  );
};

const {
  showsRequested,
  showsReceived,
  showsRequestFailed,
  singularShowRequested,
  singularShowReceived,
  singularShowRequestFailed,
  setCurrentShow,
} = slice.actions;
export default slice.reducer;
