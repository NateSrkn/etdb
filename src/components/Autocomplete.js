import React, { useState } from 'react'
import { call } from '../api/apiCall'
import { Image } from './Image'
import { MULTI_SEARCH_ENDPOINT } from '../api/endpoints'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SearchContainer = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 25rem;
  padding: 10px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  flex: 1;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 15px;
    width: 100%;
  }
`

const DropdownContainer = styled.ul`
  background: white;
  list-style: none;
  max-height: 400px;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  top: 100%;
  left: 0;
`

const DropdownItem = styled.li`
  display: flex;
  padding: 0px 0;
`

const Media = styled.div`

`

const Content = styled.div`
  padding: 10px;
  width: 100%;
`

export const Autocomplete = () => {
  let [query, setQuery] = useState('')
  let [searchData, setSearchData] = useState(null)

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const listenForInput = () => {
    let timeout = null
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if(query === "") return setSearchData(null)
      searchQuery(query)
    }, 1000)
  }

  const searchQuery = async (queryText) => {
    let options = {
      base: {
        url: MULTI_SEARCH_ENDPOINT,
        method: 'get'
      },
      params: {
        query: queryText
      }
    }
    const results = await call(options)
    setSearchData(results.results.map(row => ({
      id: row.id,
      name: row.name || row.title,
      type: row.media_type,
      image: row.poster_path || row.profile_path,
      rating: row.vote_average,
      popularity: row.popularity
    })))
  }

  const onBlur = () => {
    setQuery('')

    setTimeout(() => {
      setSearchData([])
    }, 100)
  }

  return (
    <SearchContainer className="search">
      <Input type="text" placeholder="Search Entertainment"  onChange={handleChange} onKeyUp={listenForInput} onBlur={() => onBlur()} value={query} />
      {searchData ? <Dropdown results={searchData} /> : null}
    </SearchContainer>
  )
}

const Dropdown = ({results}) => {
  const displayTitle = (type) => {
    switch (type) {
      case 'movie':
        return 'Movie'
      case 'tv':
        return 'Show'
      case 'person':
        return 'Person'
      default:
        return ''
    }
  }
  return (
    <DropdownContainer>
      {results.map(result => (
        <Link to={`/${result.type}/${result.id}`} key={result.id} >
          <DropdownItem>
            <Media>
              <Image xsmall src={result.image} alt={result.name} />
            </Media>
            <Content>
              <div style={{color: 'grey', fontSize: 12}}>
                {displayTitle(result.type)}
              </div>
              <div>{result.name}</div>
            </Content>
          </DropdownItem>
        </Link>
      ))}
    </DropdownContainer>
  )
}