import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { Title, Subtitle, Paragraph, Group } from '../components/Text'
import { Root, Section, GradientBackground } from '../components/Layout'
import { Image } from '../components/Image'
import { CastList } from '../components/CastList'

import styled from 'styled-components'

const Media = styled.div`
  grid-column: 1/8;
  grid-row: 1/1;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
  }
`

const Info = styled.div`
  color: white;
  grid-column: 5/-5;
  grid-row: 1/1;
  padding: 15px;
  font-size: .85rem;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
    grid-row: 2/2;
    padding: 10px 0;
    font-size: 12px;
  }
`
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
          append_to_response: 'credits'
        }
      }

      let personData = await call(options)
      setPerson(personData)
    }

    fetchPerson()
  }, [id])
  if(!person) return null
  return (
    <React.Fragment>
      {console.log(person)}
        <Root>
          <GradientBackground>
            <Section hero>
                <Media>
                  <Image rounded hero src={person.profile_path} alt={person.name}/>
                </Media>
                <Info>
                  <Group>
                    <Title>{person.name}</Title>
                    <Paragraph>
                      {person.biography}
                    </Paragraph>
                  </Group>
                </Info>
            </Section>
          </GradientBackground>
        </Root>

        <Root>
          <Section>
            <CastList cast={person.credits.cast} />
          </Section>
        </Root>
    </React.Fragment>
  )
}