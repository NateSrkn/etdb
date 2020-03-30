import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from './Image'
import { call } from '../api/apiCall'
import { FETCH_BULK_ENDPOINT, FETCH_LATEST_ENDPOINT } from '../api/endpoints'
import styled from 'styled-components'

const Container = styled.div``

const List = styled.ul`
  padding: 20px 0;
  display: flex;
  overflow-y: scroll;
  list-style: none;
`

const ListItem = styled.li`
  flex: 1;
  margin: 5px 10px;

  &:last-child {
    padding: 0 30px 0 0;
  }
`

const ListHeader = styled.h3``

export const MediaList = ({ type, isLatest }) => {
  let [data, setData] = useState(null)
  useEffect(() => {
      const fetchData = async () => {
        let options = {
          base: {
            url: isLatest ? FETCH_LATEST_ENDPOINT(type) : FETCH_BULK_ENDPOINT(type),
            method: 'get'
          }
        }
        const results = await call(options)
        setData(results.results.map(row => ({
          id: row.id,
          name: row.title || row.name,
          image: row.poster_path,
          type: row.media_type
        })))
      }

      fetchData()
  }, [type, isLatest])
  
  if(!data) return null
  return (
    <Container>
      <ListHeader>{type === "movie" ? "Movies" : "Shows"}</ListHeader>
      <List>
        {data.map((item, index) => <Card type={type} data={item} key={index} />)}
      </List>
    </Container>
  )
}

const Card = ({type, data}) => {
  return(
    <ListItem>
      <Link to={`/${type}/${data.id}`}>
        <Image rounded src={data.image} alt={data.name} />
      </Link>
    </ListItem>
  )
}