import React, { useState } from 'react'
import { call } from '../api/apiCall'
import { Image } from './Image'
import { MULTI_SEARCH_ENDPOINT } from '../api/endpoints'
import { Link } from 'react-router-dom'

export const Autocomplete = () => {
  let [query, setQuery] = useState('')
  let [searchData, setSearchData] = useState(null)
  let [isExpanded, setIsExpanded] = useState(false)

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

  const expandSearch = () => {
    let search = document.getElementById('main-search')
    if(isExpanded) {
      search.style.width = '0'
      search.style.borderBottom = '1px solid transparent'
      setIsExpanded(false)
    } else {
      search.style.width = '20rem'
      search.style.borderBottom = '1px solid black'
      setIsExpanded(true)
    }
  }

  return (
    <div className="search-container">
      <i onClick={() => expandSearch()} className="fas fa-search"></i>
      <input type="text" id="main-search" placeholder="Search Entertainment"  onChange={handleChange} onKeyUp={listenForInput} onBlur={() => onBlur()} value={query} />
      {searchData ? <Dropdown results={searchData} /> : null}
    </div>
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
    <div className="dropdown-menu">
      {results.map(result => (
        <Link to={`/${result.type}/${result.id}`} key={result.id} >
          <div className="drop-item">
            <div className="drop-media">
              <Image small src={result.image} alt={result.name} />
            </div>
            <div className="drop-info">
              <div className="sub-title">
                {displayTitle(result.type)}
              </div>
              <div>{result.name}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}