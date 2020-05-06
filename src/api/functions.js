import { call } from "./apiCall";
import {
  FETCH_COLLECTIONS_ENDPOINT,
  FETCH_BULK_ENDPOINT,
  FETCH_GENRE_ENDPOINT,
} from "./endpoints";

export const fetchBulk = async (type, page) => {
  let options = {
    base: {
      url: FETCH_BULK_ENDPOINT(type),
      method: "get",
    },
    params: {
      page: page,
      include_adult: false,
    },
  };

  try {
    let { total_pages, total_results, results } = await call(options);
    let formatted = {
      meta: {
        total_results: total_results,
        total_pages: total_pages,
      },
      results: results.map((row) => ({
        id: row.id,
        name: row.title || row.name,
        genres: row.genre_ids,
        poster: row.poster_path,
        rating: row.vote_average,
        released: row.release_date || row.first_air_date,
      })),
    };
    return formatted;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGenres = (type) => {
  let options = {
    base: {
      url: FETCH_GENRE_ENDPOINT(type),
      method: "get",
    },
  };
  try {
    return call(options);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCollections = async (id) => {
  let options = {
    base: {
      url: FETCH_COLLECTIONS_ENDPOINT(id),
      method: "get",
    },
  };

  try {
    let response = await call(options);
    return {
      name: response.name,
      overview: response.overview,
      poster: response.poster_path,
      backdrop: response.backdrop_path,
      parts: response.parts.map((row) => ({
        id: row.id,
        name: row.name || row.title,
        overview: row.overview,
        released: row.release_date,
        rating: row.vote_average,
        backdrop: row.backdrop_path,
        poster: row.poster_path,
      })),
    };
  } catch (error) {
    console.log(error);
  }
};
