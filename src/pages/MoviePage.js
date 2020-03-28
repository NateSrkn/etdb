import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT, FETCH_SINGULAR_CAST_ENDPOINT } from '../api/endpoints'
import { PersonCard } from '../components/PersonCard'
import { useParams } from 'react-router-dom'

export const MoviePage = () => {
  let movieId = useParams()
  let [movie, setMovie] = useState(null)
  let [credits, setCredits] = useState(null)
  console.log(movie)

  useEffect(() => {
    const fetchMovie = async (id) => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('movie', id),
          method: 'get'
        }
      }

      let creditsOptions = {
        base: {
          url: FETCH_SINGULAR_CAST_ENDPOINT('movie', id),
          method: 'get'
        }
      }
      let creditsData = await call(creditsOptions)
      let movieData = await call(options)
      setMovie(movieData)
      setCredits(creditsData)
    }
    
    fetchMovie(movieId.movieId)
  }, [movieId])

  return (
    <div className="page">
    {console.log(credits)}
      {movie ? 
        <div className="movie-hero">
          <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-info">
            <div className="title">{movie.title}</div>
            <div className="description">
              {movie.overview}
            </div>
          </div>
        </div> 
      : null}
      <div className="credits-list">
        {credits ? credits.cast.map((person, index) => (
          <Link to={`/person/${person.id}`} key={index}>
            <PersonCard  person={person} />
          </Link>
        )) 
        : null}
      </div>
    </div>
  )
}