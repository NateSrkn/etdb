import React from 'react'
import { Autocomplete } from './Autocomplete'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavList = styled.ul`
  display: flex;
  list-style-type: none;

  li {
      a {
        padding: 15px;
        border-radius: 15px;
        transition: ease .3s;
        &:hover {
        background: lightgrey;
        transition: ease .3s;
      }
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`

export const Header = () => {
  return (
    <Container className="header">
      <Link to="/" className="logo">
        Logo
      </Link>
      <NavList className="nav-items">
        <li className="item">
          <NavLink to="/all/movies">
            Movies
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/all/shows">
            TV Shows
          </NavLink>
        </li>
      </NavList>
      {/* <Autocomplete /> */}
    </Container>
  )
}