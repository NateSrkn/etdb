import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { Image } from '../components/Image'
import { Link } from 'react-router-dom'
import { ratingPercent } from '../helpers/helper'

export const PersonPage = () => {
  let id = useParams()
  let [person, setPerson] = useState(null)

  useEffect(() => {
    const fetchPerson = async () => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('person', id.personId),
          method: 'get'
        },
        params: {
          append_to_response: 'combined_credits'
        }
      }

      let personData = await call(options)
      setPerson({
        name: personData.name,
        image: personData.profile_path,
        birthday: personData.birthday,
        deathday: personData.deathday,
        birthplace: personData.place_of_birth,
        movie_credits: personData.combined_credits.cast.filter(row => row.media_type === 'movie'),
        tv_credits: personData.combined_credits.cast.filter(row => row.media_type === 'tv'),
        bio: personData.biography,
      })
    }

    fetchPerson()
  }, [id])
  if(!person) return null
  return (
    <React.Fragment>
        <div className="root">
          <div className="gradient-bg">
            <div className="section flex hero">
                <div className="hero-media">
                  <Image rounded hero src={person.image} alt={person.name}/>
                </div>
                <div className="hero-info">
                  <h3 className="media-title">{person.name}</h3>
                  <div className="group">
                    <div className="sub-title">Overview</div>
                    <p className="overview">
                      {person.bio}
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="root">
          <div className="section flex">
            {person.movie_credits.length > 0 ?      
            <div className="sub-section">
              <h3>Movies</h3>
              <MediaCredits credits={person.movie_credits} />
            </div> : null}
            {person.tv_credits.length > 0 ?      
            <div className="sub-section">
              <h3>Shows</h3>
              <MediaCredits credits={person.tv_credits} />
            </div> : null}
          </div>
        </div>
    </React.Fragment>
  )
}

const MediaCredits = ({ credits }) => {
  return (
    <ul className="vertical-scroll">
      {credits.map(row => (
        <li className="vertical-card" key={row.id}>
          <Link to={`/${row.media_type}/${row.id}`}>
            <Image src={row.poster_path} alt={row.name || row.title} flex small/>
            <div className="card-info">
              <h3 className="title">{row.name || row.title}</h3>
              <div className="group" style={{display: 'flex'}}>
                <div className="sub-group">
                  <div className="sub-title dark">Rating</div>
                  <div className="rating">{ratingPercent(row.vote_average)}</div>
                </div>
                <div className="sub-group">
                  <div className="sub-title dark">Released</div>
                  <time dateTime={row.release_date || row.first_air_date}>
                  {row.release_date || row.first_air_date}
                  </time>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}