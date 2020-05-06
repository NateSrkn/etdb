import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "featured",
  initialState: {
    list: [],
    isLoading: false,
    lastFetch: null,
  },
  reducers: {
    featuredRequested: (featured, action) => {
      featured.isLoading = true;
    },
    featuredReceived: (featured, action) => {
      featured.isLoading = false;
      featured.list = action.payload.results.map((feature) => ({
        id: feature.id,
        name: feature.title || feature.name,
        released: feature.release_date || feature.first_air_date,
        type: feature.media_type,
        rating: feature.vote_average,
        overview: feature.overview,
        poster: feature.poster_path,
        backdrop: feature.backdrop_path,
      }));
      featured.lastFetch = Date.now();
    },
    featuredRequestFailed: (featured, action) => {
      featured.isLoading = false;
    },
  },
});

const {
  featuredRequested,
  featuredReceived,
  featuredRequestFailed,
} = slice.actions;
let url = "/trending/all/week";
export const loadFeatured = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.featured;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  dispatch(
    apiCallBegan({
      url,
      params: {
        media_type: "movie,tv",
        time_window: "week",
      },
      onStart: featuredRequested.type,
      onSuccess: featuredReceived.type,
      onError: featuredRequestFailed.type,
    })
  );
};

export default slice.reducer;
