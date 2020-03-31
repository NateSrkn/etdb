import React from 'react'
import styled from 'styled-components'
import { Image } from './Image'
import { Link } from 'react-router-dom'

const Container = styled.div``

const List = styled.ul`
  list-style: none;
  display: flex;
  overflow-y: scroll;
  padding: 20px 0;
`

const ListItem = styled.li`
  flex: 0;
  margin: 0 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  color: black;
  img {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  div {
    font-weight: 600;
  }
` 

const Info = styled.div`
  font-size: 14px;
  padding: 5px 5px 15px 5px;
`
export const CastList = ({cast}) => {
  if(!cast) return null
  return (
    <Container>
      <List>
        {cast.map((credit, index) => <Card credit={credit} key={index} />)}
      </List>
    </Container>
  )
}

const Card = ({ credit }) => {
  return (
    <ListItem>
      <Link to={`/person/${credit.id}`}>
        <Image small src={credit.profile_path || credit.poster_path} alt={credit.name || credit.title} />
        <Info>
          <div>{credit.name}</div>
          <div style={{fontWeight: 'normal', fontSize: '14px'}}>{credit.character}</div>
        </Info>
      </Link>
    </ListItem>
  )
}