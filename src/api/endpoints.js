export const baseUrl = "https://api.themoviedb.org/3";

export const FETCH_BULK_ENDPOINT = (type) => `${baseUrl}/discover/${type}`;

export const MULTI_SEARCH_ENDPOINT = `${baseUrl}/search/multi`;

export const FETCH_GENRE_ENDPOINT = (type) => `${baseUrl}/genre/${type}/list`;

export const FETCH_COLLECTIONS_ENDPOINT = (id) => `${baseUrl}/collection/${id}`;
