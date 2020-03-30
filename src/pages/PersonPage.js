import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT, FETCH_PERSON_CREDITS_ENDPOINT } from '../api/endpoints'
import { Root, Section } from '../components/Layout'
import { Image } from '../components/Image'
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
    <React.Fragment>
      {console.log(credits)}
        <Root>
          <Section>
              {person ? 
              <div>
                <Image rounded src={person.profile_path} alt={person.name} />
                {person.name}
              </div>
            : null}
          </Section>
        </Root>
    </React.Fragment>
  )
}