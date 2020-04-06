import { call } from "./apiCall"
import { FETCH_SINGULAR_ENDPOINT, FETCH_COLLECTIONS_ENDPOINT, FETCH_BULK_ENDPOINT, FETCH_TRENDING_ENDPOINT } from "./endpoints"

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
      collection: response.belongs_to_collection,
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

export const fetchPerson = async (id) => {
  let options = {
    base: {
      url: FETCH_SINGULAR_ENDPOINT('person', id),
      method: 'get'
    },
    params: {
      append_to_response: 'combined_credits'
    }
  }

  try {
    let response = await call(options)
    return({
      name: response.name,
      image: response.profile_path,
      birthday: response.birthday,
      deathday: response.deathday,
      birthplace: response.place_of_birth,
      overview: response.biography,
      movie_credits: response.combined_credits.cast.filter(row => row.media_type === 'movie'),
      tv_credits: response.combined_credits.cast.filter(row => row.media_type === 'tv'),
    })
  } catch (error) {
    console.log(error)
  }
}

export const fetchBulk = async (type, page) => {
  let options = {
    base: {
      url: FETCH_BULK_ENDPOINT(type),
      method: 'get'
    },
    params: {
      page: page,
      include_adult: false,
    }
  }

  try {
    let response = await call(options)
    let formatted = {
      total_pages: response.total_pages,
      results: response.results.map(row => ({
        id: row.id,
        name: row.title || row.name,
        image: row.poster_path,
        rating: row.vote_average,
        released: row.release_date || row.first_air_date,
      }))
    }
    return(formatted)
  } catch(error) {
    console.log(error)
  }
}

export const fetchCollections = async (id) => {
  let options = {
    base: {
      url: FETCH_COLLECTIONS_ENDPOINT(id),
      method: 'get',
    }
  }

  try {
    let response = await call(options)
    return {
      name: response.name,
      overview: response.overview,
      poster: response.poster_path,
      backdrop: response.backdrop_path,
      parts: response.parts.map(row => ({
        id: row.id,
        name: row.name || row.title,
        overview: row.overview,
        released: row.release_date,
        rating: row.vote_average,
        backdrop: row.backdrop_path,
        poster: row.poster_path
      }))
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchTrending = async (type) => {
  let options = {
    base: {
      url: FETCH_TRENDING_ENDPOINT(type),
      method: 'get'
    }
  }

  try {
    let response = await call(options)
    console.log(response)
    return response.results.map(row => ({
      id: row.id,
      name: row.title || row.name,
      overview: row.overview,
      released: row.release_date || row.first_air_date,
      poster: row.poster_path,
      backdrop: row.backdrop_path,
      rating: row.vote_average,
      type: row.media_type,
    }))
  } catch (error) {
    console.log(error)
    return error
  }

}