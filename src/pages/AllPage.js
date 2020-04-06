import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from '../components/Image'
import styled from 'styled-components'
import { fetchBulk } from '../api/functions'
import { Button } from '../components/Button'

const MediaGrid = styled.div`
  display: flex;
  flex-flow: wrap;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`
const MediaItem = styled.div`
  margin: 5px 5px;
  flex: 0 1;
`
export const AllPage = ({ type }) => {
  let [data, setData] = useState([])
  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(null)

  useEffect(() => {
    fetchBulk(type, page).then(response => {
      setData(d => d.concat(response.results))
      setTotalPages(response.total_pages)
    })
  }, [type, page])

  const onScrollToBottom = (event) => {
    event.preventDefault()
    if(page < totalPages) {
      setPage(page += 1)
    }
  }

  if(data.length < 0) return null
  return (
    <React.Fragment>
      <div className="root">
        <section className="section">
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
        </section>
      </div>
      <div className="root">
        <section className="section" style={{display: 'flex', justifyContent: 'center'}}>
          <Button onClick={(event) => onScrollToBottom(event)} style={{margin: '0 auto', width: 150}}>Find More</Button>
        </section>
      </div>
    </React.Fragment>
  )
}