import  axios from 'axios'
import * as actions from '../types/api'
import { baseUrl } from '../../api/endpoints'
const api = ({ dispatch }) => next => async action => {
  if(action.type !== actions.apiCallBegan.type) return next(action)
  const { url, method, data, params, onStart, onSuccess, onError } = action.payload
  onStart && dispatch({type: onStart})
  next(action)
  try {
    const response = await axios.request({
      baseURL: baseUrl,
      url,
      method,
      data,
      params: {
        api_key: process.env.REACT_APP_MOVIE_DB_KEY,
        ...params
      }
    })
    dispatch(actions.apiCallSuccess(response.data))
    onSuccess && dispatch({ type: onSuccess, payload: response.data })
  } catch(error) {
    dispatch(actions.apiCallFailed(error.message))
    onError && dispatch({type: onError, payload: error.message })
  }
}

export default api