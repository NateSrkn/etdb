import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT, FETCH_PERSON_CREDITS_ENDPOINT } from '../api/endpoints'
import { Root, Section } from '../components/Layout'
import { Image } from '../components/Image'
import { CastList } from '../components/CastList'
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
        },
        params: {
          append_to_response: 'credits'
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
  if(!person) return null
  return (
    <React.Fragment>
      {console.log(person)}
        <Root>
          <Section hero>
              <div>
                <Image rounded src={person.profile_path} alt={person.name} style={{width: '100%'}}/>
                {person.name}
              </div>
          </Section>
        </Root>

        <Root>
          <Section>
            <CastList cast={person.credits.cast} />
          </Section>
        </Root>
    </React.Fragment>
  )
}