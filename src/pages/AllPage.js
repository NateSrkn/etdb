import React, { useEffect, useState } from 'react'
import { Root, Section } from '../components/Layout'
import { Link } from 'react-router-dom'
import { Image } from '../components/Image'
import { call } from '../api/apiCall'
import { FETCH_BULK_ENDPOINT } from '../api/endpoints'
import styled from 'styled-components'

const MediaGrid = styled.div`
  display: flex;
  flex-flow: wrap;
`
const MediaItem = styled.div`
  margin: 5px 5px;
  flex: 0;
  ${'' /* width: 16%; */}
`

const Sidebar = styled.div`

`
export const AllPage = ({ type }) => {
  let [data, setData] = useState([])
  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(null)

  const fetchData = async () => {
    let options = {
      base: {
        url: FETCH_BULK_ENDPOINT(type),
        method: 'get'
      },
      params: {
        page: page,
        region: 'US',
        include_adult: false
      }
    }
    try {
      let response = await call(options)
      setData(data.concat(response.results.map(row => ({
        id: row.id,
        name: row.title || row.name,
        image: row.poster_path,
        released: row.release_date
      }))))
      setTotalPages(response.total_pages)
    } catch (err) {
      console.log(err)
      setData(null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  const onScrollToBottom = (event) => {
    event.preventDefault()
    if(page < totalPages) {
      setPage(page += 1)
      fetchData()
    }
  }

  if(data.length < 0) return null
  return (
    <React.Fragment>
      <Root>
        <Section>
          <h3>
            {type === "movie" ? "All Movies" : "All Shows"}
          </h3>
          <MediaGrid>
          {data.map(item => (
              <MediaItem key={item.id}>
                <Link to={`/${type}/${item.id}`}>
                  <Image rounded src={item.image} alt={item.name} />
                </Link>
              </MediaItem>
            ))}
          </MediaGrid>
        </Section>
      </Root>
      <Root>
        <Section>
          <button onClick={(event) => onScrollToBottom(event)} style={{margin: '0 auto'}}>Find More</button>
        </Section>
      </Root>
    </React.Fragment>
  )
}