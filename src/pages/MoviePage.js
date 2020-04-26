import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadSingularMovie } from '../store/types/movies'
import { Image } from '../components/Image'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { CastList } from '../components/CastList' 
import { ratingPercent } from '../helpers/helper'
import { addMovieToViewed } from '../store/types/viewed'

export const MoviePage = () => {
  const { movieId } = useParams()
  const dispatch = useDispatch()
  const movie = useSelector(state => state.entities.movies.currentMovie.data)
  const movieLoading = useSelector(state => state.entities.movies.currentMovie.isLoading)

  useEffect(() => {
    dispatch(loadSingularMovie(movieId))
    dispatch(addMovieToViewed())
  }, [dispatch, movieId])
  
  if(!movie) return null
  return (
    <React.Fragment>
      <div className="root" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div className="gradient-bg">
          <section className="section flex hero">
            <div className="hero-media">
              <Image hero rounded src={movie.poster} alt={movie.name} />
            </div>
            <div className="hero-info">
              {movie.tagline ? <div className="sub-title">{movie.tagline}</div> : null}
              <h2 className="media-title">{movie.name}</h2>    
              <div className="group" style={{display: 'flex'}}>
                <div className="sub-group">
                  <div className="sub-title">Rating</div>
                  <div>{ratingPercent(movie.rating)}</div>
                </div>
                <div className="sub-group">
                  <h4 className="sub-title">Release Date</h4>
                  <time dateTime={movie.released}>{movie.released}</time>
                </div>
              </div>
              <div className="group">
                <div className="sub-title">Genre</div>
                <div>{movie.genres && movie.genres.map(row => row.name).join(', ')}</div>
              </div>
              <div className="group">
                <h4 className="sub-title">Overview</h4>
                <p className="overview">
                  {movie.overview}
                </p>
              </div>
              {movie.creators ? 
                <div className="group">
                  <div className="sub-title">Created by</div>
                  <div>{movie.creators.map(creator => creator.name).join(', ')}</div>
                </div>
              : null}
              {movie.collection ? 
                <Button link={`/collection/${movie.collection.id}`}>
                  {movie.collection.name}
                </Button>
              : null}
            </div>
          </section>
        </div>
      </div>
      <div className="root">
        <div className="section">
          <h3 className="section-title">Cast</h3>
          <CastList cast={movie.cast} />
        </div>
      </div>
      <div className="root">
        <div className="section flex">
        {movie.similar && movie.similar.length > 0 ? 
          <div className="sub-section">
            <h3 className="section-title">Similar Movies</h3>
              <ul className="vertical-scroll">
                {movie.similar.map(row => (
                  <li className="vertical-card" key={row.id}>
                    <Link to={`/movie/${row.id}`} style={{display: 'flex'}}>
                      <Image small src={row.image} alt={row.name} flex />
                      <div className="card-info">
                        <h3 className="title">{row.name}</h3>
                        <div className="group" style={{display: 'flex'}}>
                          <div className="sub-group">
                            <div className="sub-title dark">Rating</div>
                            <div>{ratingPercent(row.rating)}</div>
                          </div>
                          <div className="sub-group">
                            <div className="sub-title dark">Release Date</div>
                            <div>{row.released}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
          : null}
        </div>
      </div>
    </React.Fragment>
  )
}