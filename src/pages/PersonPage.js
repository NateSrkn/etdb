import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT, FETCH_PERSON_CREDITS_ENDPOINT } from '../api/endpoints'

export const PersonPage = () => {
  let id = useParams()
  let [person, setPerson] = useState(null)
  let [credits, setCredits] = useState(null)

  useEffect(() => {
    const fetchPerson = async () => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('person', id.personId),
          method: 'get'
        }
      }

      let creditsOption = {
        base: {
          url: FETCH_PERSON_CREDITS_ENDPOINT('combined', id.personId),
          method: 'get'
        }
      }
      let creditsData = await call(creditsOption)
      let personData = await call(options)
      setPerson(personData)
      setCredits(creditsData)
    }

    fetchPerson()
  }, [id])
  return (
    <div className="page">
      {console.log(credits)}
      {person ? 
        <div>
          <div className="poster">
            {person.profile_path ?
            <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name}/> 
            : 
            <img src={`https://via.placeholder.com/500x750.png?text=${person.name}`} alt={person.name} />}
          </div>
          {person.name}
        </div>
      : null}
    </div>
  )
}