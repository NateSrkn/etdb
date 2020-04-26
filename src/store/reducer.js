import { combineReducers } from 'redux'
import entitiesReducer from './entities'
import viewedReducer from './types/viewed'

export default combineReducers({
  entities: entitiesReducer,
  viewed: viewedReducer
})