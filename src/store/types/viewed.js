import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'viewed',
  initialState: {
    movies: [],
    shows: [],
    people: []
  },
  reducers: {
    newMovieViewed: (viewed, action) => {
      viewed.movies.push(action.payload)
    },
    newShowViewed: (viewed, action) => {
      viewed.shows.push(action.payload)
    },
    newPersonViewed: (viewed, action) => {
      viewed.person.push(action.payload)
    }
  }
})


export const addMovieToViewed = () => (dispatch, getState) => {
  const { movies } = getState().viewed
  const currentMovie = getState().entities.movies.currentMovie.data
  const exists = movies && currentMovie && movies.filter(item => item.id == currentMovie.id)
  if(exists && exists.length > 0) return 
  currentMovie && dispatch(newMovieViewed(currentMovie))
}


export const addShowToViewed = () => (dispatch, getState) => {
  const { shows } = getState().viewed
  const currentShow = getState().entities.shows.currentShow.data
  const exists = shows && currentShow && shows.filter(item => item.id == currentShow.id)
  if(exists && exists.length > 0) return 
  currentShow && dispatch(newShowViewed(currentShow))
}

export const addPersonToViewed = () => (dispatch, getState) => {
  const { people } = getState().viewed
  const { currentPerson } = getState().entities.people
  const person = people && people.filter(item => item.id === currentPerson.id)
  dispatch(newPersonViewed(person))
}

const { newMovieViewed, newShowViewed, newPersonViewed } = slice.actions
export default slice.reducer