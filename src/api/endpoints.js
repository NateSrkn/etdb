export const baseUrl = 'https://api.themoviedb.org/3'

export const FETCH_SINGULAR_ENDPOINT = (type, id) => {
  let endpoint = `${baseUrl}/${type}/${id}`
  return endpoint
}

export const FETCH_LATEST_ENDPOINT = (type) => {
  let endpoint = `${baseUrl}/${type}/popular`
  return endpoint
}

export const FETCH_BULK_ENDPOINT = (type) => {
  let endpoint = `${baseUrl}/discover/${type}`
  return endpoint
}

export const MULTI_SEARCH_ENDPOINT = `${baseUrl}/search/multi`

export const FETCH_TRENDING_ENDPOINT = (type) => {
  let endpoint = `${baseUrl}/trending/${type}/week`
  return endpoint
}

export const FETCH_COLLECTIONS_ENDPOINT = (id) => {
  let endpoint = `${baseUrl}/collection/${id}`
  return endpoint
}