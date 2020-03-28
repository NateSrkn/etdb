import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PersonCard } from '../components/PersonCard'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT, FETCH_SINGULAR_CAST_ENDPOINT } from '../api/endpoints'
import { useParams } from 'react-router-dom'

export const TVPage = () => {
  let tvId = useParams()
  let [show, setShow] = useState(null)
  let [credits, setCredits] = useState(null)
  console.log(show)

  useEffect(() => {
    const fetchShow = async (id) => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('tv', id),
          method: 'get'
        }
      }

      let creditsOptions = {
        base: {
          url: FETCH_SINGULAR_CAST_ENDPOINT('tv', id),
          method: 'get'
        }
      }
      let creditsData = await call(creditsOptions)
      const showData = await call(options)
      setCredits(creditsData)
      setShow(showData)
    }
    
    fetchShow(tvId.tvId)
  }, [tvId])



  return (
    <div className="page">
      {show ? 
      <div className="page-hero">
        <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
        </div>
        <div className="page-info">
          <h2>{show.name}</h2>
          <div className="description">
            <p>
              {show.overview}
            </p>
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