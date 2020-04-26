// import { createSlice } from '@reduxjs/toolkit'
// import { createSelector } from 'reselect'
// import { apiCallBegan } from './api'
// import moment from 'moment'

// const slice = createSlice({
//   name: 'people',
//   initialState: {
//     list: [],
//     loading: false,
//     lastFetch: null
//   },
//   reducers: {
//     peopleRequested: (people, action) => {
//       people.loading = true
//     },
//     peopleReceived: (people, action) => {
//       people.list = action.payload
//       people.loading = false
//       people.lastFetch = Date.now()
//     },
//     peopleRequestFailed: (people, action) => {
//       people.loading = false
//     }
//   }
// })

// const bulkUrl = '/discover/people'

// export const loadShows = () => (dispatch, getState) => {
//   const { lastFetch } = getState().entities.shows
//   const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
//   if(diffInMinutes < 10) return
//   dispatch(apiCallBegan({
//     bulkUrl,
//     onStart: showsRequested.type,
//     onSuccess: showsReceived.type,
//     onError: showsRequestFailed.type
//   }))
// }

// export const getSingularMovie = showId => createSelector(
//   state => state.entities.shows.list,
//   (shows) => shows.filter(show => show.id === showId)
// )

// const { showsRequested, showsReceived, showsRequestFailed } = slice.actions
// export default slice.reducer