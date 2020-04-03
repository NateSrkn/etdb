import { call } from "./apiCall"
import { FETCH_SINGULAR_ENDPOINT } from "./endpoints"

export const fetchMedia = async (type, id) => {
  let options = {
    base: {
      url: FETCH_SINGULAR_ENDPOINT(type, id),
      method: 'get'
    },
    params: {
      append_to_response: 'credits,similar'
    }
  }

  try {
    let response = await call(options)
    console.log(response)
    return {
      name: response.name || response.title,
      released: response.release_date || response.first_air_date,
      tagline: response.tagline,
      rating: response.vote_average,
      creators: response.created_by,
      genres: response.genres,
      overview: response.overview,
      backdrop: response.backdrop_path,
      poster: response.poster_path,
      cast: response.credits.cast,
      crew: response.credits.crew,
      seasons: response.seasons,
      networks: response.networks,
      similar: response.similar.results.map(row => ({
        id: row.id,
        name: row.title || row.name,
        released: row.release_date || row.first_air_date,
        rating: row.vote_average,
        overview: row.overview,
        image: row.poster_path
      })),
      production: response.production_companies,
      last_episode: response.last_episode_to_air,
      next_episode: response.next_episode_to_air,
    }
  } catch (error) {
    console.log(error)
    return []
  }
}