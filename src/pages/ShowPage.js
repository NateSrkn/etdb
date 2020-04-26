import React, { useEffect } from 'react'
import { Image } from '../components/Image'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CastList } from '../components/CastList'
import { ratingPercent } from '../helpers/helper'
import { Button } from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { loadSingularShow } from '../store/types/shows'
import { addShowToViewed } from '../store/types/viewed'

export const ShowPage = () => {
  let { tvId } = useParams()
  const dispatch = useDispatch()
  const show = useSelector(state => state.entities.shows.currentShow.data)

  useEffect(() => {
      dispatch(loadSingularShow(tvId))
      dispatch(addShowToViewed())
  }, [dispatch, tvId])

  if(!show) return null
  return (
    <React.Fragment>
      <div className="root" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${show.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div className="gradient-bg">
          <section className="section flex hero">
            <div className="hero-media">
              <Image hero rounded src={show.poster} alt={show.name} />
            </div>
            <div className="hero-info">
              {show.tagline ? <div className="sub-title">{show.tagline}</div> : null}
              <h2 className="media-title">{show.name}</h2>    
              <div className="group" style={{display: 'flex'}}>
                <div className="sub-group">
                  <div className="sub-title">Rating</div>
                  <div>{ratingPercent(show.rating)}</div>
                </div>
                <div className="sub-group">
                  <h4 className="sub-title">Release Date</h4>
                  <time dateTime={show.released}>{show.released}</time>
                </div>
              </div>
              <div className="group">
                <div className="sub-title">Genre</div>
                <div>{show.genres.map(row => row.name).join(', ')}</div>
              </div>
              <div className="group">
                <h4 className="sub-title">Overview</h4>
                <p className="overview">
                  {show.overview}
                </p>
              </div>
              {show.seasons ? 
                <div className="group" style={{display: 'flex'}}>
                  <div className="sub-group">
                    <div className="sub-title">Seasons</div>
                    <div>{show.seasons.length}</div>
                  </div>
                  {show.last_episode ? 
                    <div className="sub-group">
                      <div className="sub-title">Last Episode</div>
                      <div>{show.last_episode.air_date}</div>
                    </div>
                  : null}
                  {show.next_episode ? 
                    <div className="sub-group">
                      <div className="sub-title">Next Episode</div>
                      <div>{show.next_episode.air_date}</div>
                    </div>
                  : null}
                </div>
              : null} 
              {show.creators ? 
                <div className="group">
                  <div className="sub-title">Created by</div>
                  <div>{show.creators.map(creator => creator.name).join(', ')}</div>
                </div>
              : null}
            </div>
          </section>
        </div>
      </div>
      <div className="root">
        <div className="section">
          <h3 className="section-title">Cast</h3>
          <CastList cast={show.cast} />
        </div>
      </div>
      <div className="root">
        <div className="section flex">
          {show.seasons ? 
            <div className="sub-section">
              <h3 className="section-title">Seasons</h3>
                <ul className="vertical-scroll">
                  {show.seasons.map(row => (
                    <li className="vertical-card" key={row.id}>
                      <div className="flex-card">
                        <Image small src={row.poster_path} alt={row.name} flex />
                        <div className="card-info">
                          <h3 className="title">{row.name}</h3>
                          <div className="group" style={{display: 'flex'}}>
                            <div className="sub-group">
                              <div className="sub-title dark">Episodes</div>
                              <div>{row.episode_count}</div>
                            </div>
                            <div className="sub-group">
                              <div className="sub-title dark">Air Date</div>
                              <div>{row.air_date}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>
          : null}
          {show.similar.length > 0 ? 
          <div className="sub-section">
            <h3 className="section-title">Similar Shows</h3>
              <ul className="vertical-scroll">
                {show.similar.map(row => (
                  <li className="vertical-card" key={row.id}>
                    <Link to={`/tv/${row.id}`} style={{display: 'flex'}}>
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