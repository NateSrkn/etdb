import React from 'react'
import { truncateString } from '../helpers/helper'
import { Link } from 'react-router-dom'
import { Image } from './Image'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 0.5em;
  padding: 3rem 0;
`
const Media = styled.div`
  grid-column: 2/7;
  grid-row: 1/1;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
  }
`

const Info = styled.div`
  grid-column: 7/-3;
  grid-row: 1/1;
  padding: 15px;
  font-size: .85rem;
  color: #F9F8F8;
  a {
    color: inherit;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-column: 2/12;
    grid-row: 2/2;
    font-size: 12px;
  }
`
export const FeatureCard = ({ feature }) => {
  return (
    <Container>    
        <Media>
          <Image rounded src={feature.backdrop_path} alt={feature.title || feature.name} style={{width: 'auto'}}/>
        </Media>
        <Info>
          <div className="head" style={{fontSize: '1rem'}}>
            <h3>{truncateString(feature.title || feature.name, 50)}</h3>
            <ul className="sub-info"></ul>
          </div>
          <div className="overview" style={{padding: '10px 0'}}>
            {truncateString(feature.overview, 200)}
          </div>
          <Link to={`/${feature.media_type}/${feature.id}`}>
            Learn More
          </Link>
        </Info>
    </Container>
  )
}