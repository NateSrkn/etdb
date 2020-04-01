import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { Title, Paragraph, Group } from '../components/Text'
import { Root, Section, GradientBackground } from '../components/Layout'
import { Image } from '../components/Image'
import { Link } from 'react-router-dom'

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
        <Root>
          <GradientBackground>
            <Section hero>
                <Media>
                  <Image rounded hero src={person.image} alt={person.name}/>
                </Media>
                <Info>
                  <Group>
                    <Title>{person.name}</Title>
                    <Paragraph>
                      {person.bio}
                    </Paragraph>
                  </Group>
                </Info>
            </Section>
          </GradientBackground>
        </Root>
        <Root>
          <Section flex>
            {person.movie_credits.length > 0 ?      
            <div>
              <h3>Movies</h3>
              <MediaCredits credits={person.movie_credits} />
            </div> : null}
            {person.tv_credits.length > 0 ?      
            <div>
              <h3>Shows</h3>
              <MediaCredits credits={person.tv_credits} />
            </div> : null}
          </Section>
        </Root>
    </React.Fragment>
  )
}

const Container = styled.div`
    max-height: 40rem;
    overflow-y: scroll;
    padding: 0 15px;
    flex: 0;
`

const Card = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px 0;
  display: flex;

  div {
    img {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
  div.info {
    padding: 15px;
  }
`

const MediaCredits = ({ credits }) => {
  return (
    <Container>
      {credits.map(row => (
        <Link key={row.id} to={`/${row.media_type}/${row.id}`}>
          <Card>
            <Image xsmall src={row.poster_path} alt={row.title || row.name} />
            <div className="info">
              {row.title || row.name}
            </div>
          </Card>
        </Link>
      ))}
    </Container>
  )
}