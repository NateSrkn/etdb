import React, { useState } from 'react'
import { TextInput } from './TextInput'
import { call } from '../api/apiCall'
import { Image } from './Image'
import { MULTI_SEARCH_ENDPOINT } from '../api/endpoints'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const SearchContainer = styled.div`
  position: relative;
`

const DropdownContainer = styled.ul`
  background: white;
  list-style: none;
  max-height: 400px;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  top: 20px;
  left: 0;
`

const DropdownItem = styled.li`
  display: flex;
  padding: 5px 0;
  border: 1px solid green;
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

  return (
    <SearchContainer className="search">
      <TextInput placeholder="Search Entertainment" onChange={handleChange} onKeyUp={listenForInput} value={query} typeahead />
      {searchData ? <Dropdown results={searchData} /> : null}
    </SearchContainer>
  )
}

const Dropdown = ({results}) => {
  console.log(results)
  return (
    <DropdownContainer>
      {results.map((result, index) => (
        <Link to={`/${result.type}/${result.id}`}>
          <DropdownItem key={index}>
            <Media>
              <Image xsmall src={result.image} alt={result.name} />
            </Media>
            <Content>
              {result.type} - {result.name}
            </Content>
          </DropdownItem>
        </Link>
      ))}
    </DropdownContainer>
  )
}