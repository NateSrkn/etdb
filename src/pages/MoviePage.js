import React, { useState, useEffect } from 'react'
import { Section, Root } from '../components/Layout'
import { Image } from '../components/Image'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { useParams } from 'react-router-dom'
import { CastList } from '../components/CastList'

export const MoviePage = () => {
  let movieId = useParams()
  let [movie, setMovie] = useState(null)
  console.log(movie)

  useEffect(() => {
    const fetchMovie = async (id) => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('movie', id),
          method: 'get'
        },
        params: {
          append_to_response: 'credits'
        }
      }

      let movieData = await call(options)
      setMovie(movieData)
    }
    
    fetchMovie(movieId.movieId)
  }, [movieId])

  return (
    <React.Fragment>
      <Root>
        <Section>
          {movie ? 
            <div className="movie-hero">
              <Image rounded src={movie.poster_path} alt={movie.title} />
              <div className="movie-info">
                <div className="title">{movie.title}</div>
                <div className="description">
                  {movie.overview}
                </div>
              </div>
            </div> 
          : null}
        </Section>
      </Root>
      <Root>
        <Section>
          {movie ? <CastList cast={movie.credits.cast} /> : null}
        </Section>
      </Root>
    </React.Fragment>
  )
}