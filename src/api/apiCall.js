import axios from 'axios'

export const call = (options) => {
  let settings = {
    ...options.base,
    params: {
      api_key: process.env.REACT_APP_MOVIE_DB_KEY,
      ...options.params || null
    }
  }
  return axios(settings)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return err
  })
}