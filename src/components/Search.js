import React, { useState } from 'react'
import { TextInput } from './TextInput'
import { call } from '../api/apiCall'
import { MULTI_SEARCH_ENDPOINT } from '../api/endpoints'
import { Link } from 'react-router-dom'

export const Search = () => {
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
    setSearchData(results)
  }

  return (
    <div className="search">
      <TextInput placeholder="Search Entertainment" onChange={handleChange} onKeyUp={listenForInput} value={query} />
      <ul className="search-results">
        {searchData ? 
          searchData.results.map((result, index) => (
            <Link to={`/${result.media_type}/${result.id}`} onClick={() => setSearchData('')} key={index} >
              <li className="result">
                <div className="image">
                  {result.poster_path ? 
                  <img src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.name} /> 
                  : 
                  <img src={`https://image.tmdb.org/t/p/w500/${result.profile_path}`} alt={result.name} />}
                </div>
                <div className="info">
                  <div className="type">{result.media_type}</div>
                  <div className="title">{result.title ? result.title : result.name}</div>
                </div>
              </li>
            </Link>
          ))
        : null}
      </ul> 
    </div>
  )
}