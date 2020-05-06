import { combineReducers } from "redux";
import personReducer from "./types/person";
import moviesReducer from "./types/movies";
import showsReducer from "./types/shows";
import featuredReducer from "./types/featured";

export default combineReducers({
  featured: featuredReducer,
  movies: moviesReducer,
  shows: showsReducer,
  person: personReducer,
});
