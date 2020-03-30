import React, { useState, useEffect } from 'react'
// import { Root, Section } from '../components/Layout'
// import { CastList } from '../components'
// import { Image } from '../components/Image'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { Image } from '../components/Image'
import { useParams } from 'react-router-dom'
import { Root, Section } from '../components/Layout'
import styled from 'styled-components'
import { CastList } from '../components/CastList'

const Media = styled.div`
  flex: 1;
  ${'' /* grid-column: 2/7;
  grid-row: 1/1;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
  } */}
`

const Info = styled.div`
flex: 1;
  ${'' /* grid-column: 7/-3;
  grid-row: 1/1;
  padding: 15px;
  font-size: .85rem;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
    grid-row: 2/2;
    padding: 0;
    font-size: 12px;
  } */}
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
          append_to_response: 'credits'
        }
      }
      try {
        let response = await call(options)
        setData(response)
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
      <Root>
        <Section hero>
          <Media>
            <Image src={data.poster_path} alt={data.title || data.name} style={{width: '100%'}}/>
          </Media>
          <Info>
            <h3>{data.title || data.name}</h3>
            <div>
              {data.overview}
            </div>
          </Info>
        </Section>
      </Root>
      <Root>
        <Section>
          <CastList cast={data.credits.cast} />
        </Section>
      </Root>
      {/* {console.log(data)} */}
    </React.Fragment>
  )
}