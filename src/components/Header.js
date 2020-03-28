import React from 'react'
import { Search } from './Search'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        Movie App
      </Link>
      <Search />
      <div className="nav-items">
        <div className="item">Movies</div>
        <div className="item">TV Shows</div>
      </div>
    </div>
  )
}