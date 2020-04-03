import React, { useState, useEffect } from 'react'
import { Image } from '../components/Image'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CastList } from '../components/CastList'
import { fetchMedia } from '../api/functions'
import { ratingPercent } from '../helpers/helper'

export const MediaPage = ({ type }) => {
  let id = useParams()
  let [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchMedia(type, id.movieId || id.tvId))
    }
    fetchData()
  }, [type, id])

  if(!data) return null
  return (
    <React.Fragment>
      <div className="root" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <div className="gradient-bg">
          <section className="section flex hero">
            <div className="hero-media">
              <Image hero rounded src={data.poster} alt={data.name} />
            </div>
            <div className="hero-info">
              {data.tagline ? <div className="sub-title">{data.tagline}</div> : null}
              <h2 className="media-title">{data.name}</h2>    
              <div className="group" style={{display: 'flex'}}>
                <div className="sub-group">
                  <div className="sub-title">Rating</div>
                  <div>{ratingPercent(data.rating)}</div>
                </div>
                <div className="sub-group">
                  <h4 className="sub-title">Release Date</h4>
                  <time dateTime={data.released}>{data.released}</time>
                </div>
              </div>
              <div className="group">
                <div className="sub-title">Genre</div>
                <div>{data.genres.map(row => row.name).join(', ')}</div>
              </div>
              <div className="group">
                <h4 className="sub-title">Overview</h4>
                <p className="overview">
                  {data.overview}
                </p>
              </div>
              {data.seasons ? 
                <div className="group" style={{display: 'flex'}}>
                  <div className="sub-group">
                    <div className="sub-title">Seasons</div>
                    <div>{data.seasons.length}</div>
                  </div>
                  {data.last_episode ? 
                    <div className="sub-group">
                      <div className="sub-title">Last Episode</div>
                      <div>{data.last_episode.air_date}</div>
                    </div>
                  : null}
                  {data.next_episode ? 
                    <div className="sub-group">
                      <div className="sub-title">Next Episode</div>
                      <div>{data.next_episode.air_date}</div>
                    </div>
                  : null}
                </div>
              : null} 
              {data.creators ? 
                <div className="group">
                  <div className="sub-title">Created by</div>
                  <div>{data.creators.map(creator => creator.name).join(', ')}</div>
                </div>
              : null}
            </div>
          </section>
        </div>
      </div>
      <div className="root">
        <div className="section">
          <h3 className="section-title">Cast</h3>
          <CastList cast={data.cast} />
        </div>
      </div>
      <div className="root">
        <div className="section flex">
          {data.seasons ? 
            <div className="sub-section">
              <h3 className="section-title">Seasons</h3>
                <ul className="vertical-scroll">
                  {data.seasons.map(row => (
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
          <div className="sub-section">
            <h3 className="section-title">{type === 'movie' ? 'Similar Movies'  : 'Similar Shows'}</h3>
              <ul className="vertical-scroll">
                {data.similar.map(row => (
                  <li className="vertical-card" key={row.id}>
                    <Link to={`/${type}/${row.id}`} style={{display: 'flex'}}>
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
        </div>
      </div>
    </React.Fragment>
  )
}