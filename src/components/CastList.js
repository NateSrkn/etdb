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
        <Image rounded small src={credit.profile_path} alt={credit.name} />
        <div>{credit.name}</div>
        {credit.character}
      </Link>
    </ListItem>
  )
}