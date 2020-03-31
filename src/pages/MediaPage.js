import React, { useState, useEffect } from 'react'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { Image } from '../components/Image'
import { useParams } from 'react-router-dom'
import { Title, SubTitle, Paragraph, Group } from '../components/Text'
import { Root, GradientBackground, Section } from '../components/Layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CastList } from '../components/CastList'

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

  h3 {
    font-size: 24px;
    padding-bottom: 10px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
    grid-row: 2/2;
    padding: 10px 0;
    font-size: 12px;
  }
`

const Similar = styled.div`
  max-height: 40rem;
  overflow-y: scroll;
  padding: 0 15px;
  flex: 1;
`

const Card = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px 0;

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

export const MediaPage = ({ type }) => {
  let id = useParams()
  let [data, setData] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT(type, id.movieId || id.tvId),
          method: 'get'
        },
        params: {
          append_to_response: 'credits,similar'
        }
      }
      try {
        let response = await call(options)
        // console.log(response)
        setData({
          name: response.name || response.title,
          released: response.release_date || response.first_air_date,
          genres: response.genres,
          overview: response.overview,
          backdrop: response.backdrop_path,
          poster: response.poster_path,
          credits: response.credits,
          seasons: response.seasons,
          networks: response.networks,
          similar: response.similar.results.map(row => ({
            id: row.id,
            name: row.title || row.name,
            overview: row.overview,
            image: row.poster_path,
          })),
          production: response.production_companies,
          last_epsiode: response.last_epsiode_to_air,
          next_episode: response.next_episode_to_air
        })
      } catch (err) {
        console.log(err)
        setData([])
      }
    }
    fetch()
  }, [type, id])

  if(!data) return null
  return (
    <React.Fragment>
      <Root style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <GradientBackground>
          <Section hero>
            <Media>
              <Image hero rounded src={data.poster} alt={data.name}/>
            </Media>
            <Info>
              <Group>
                <Title>{data.name}</Title>
                <Group>
                  <SubTitle>
                    Released
                  </SubTitle>
                  <Paragraph>
                    {data.released}
                  </Paragraph>
                </Group>
                <Paragraph style={{paddingTop: '10px'}}>
                  {data.overview}
                </Paragraph>
              </Group>
              {data.networks ? data.networks.map((row) => (
                <Image src={row.logo_path} alt={row.name} key={row.name} />
              )) : null}
            </Info>
          </Section>
        </GradientBackground>
      </Root>
      <Root>
        <Section>
          <h3>Cast</h3>
          <CastList cast={data.credits.cast} />
        </Section>
      </Root>
      <Root>
        <Section style={{display: 'flex'}}>
          <Similar>
            <h3>Similar {type === "movie" ? 'Movies' : 'Shows'}</h3>
            {data.similar.map(row => (
              <Link key={row.id} to={`/${type}/${row.id}`}>
                <Card style={{display: 'flex'}}>
                  <Image xsmall src={row.image} alt={row.name} />
                  <div className="info">
                    {row.name}
                  </div>
                </Card>
              </Link>
            ))}
          </Similar>
        </Section>
      </Root>
    </React.Fragment>
  )
}