import React from 'react'
import { Autocomplete } from './Autocomplete'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const NavList = styled.ul`
  display: flex;
  list-style-type: none;

  flex: 1;
  li {
      a {
        padding: 10px;
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
      <div style={{display: 'flex', width: '100%'}}>
        <div>
          <Link to="/" className="logo" style={{flex: '1'}}>
            Logo
          </Link>
        </div>
        <div style={{margin: '0 auto'}}>
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

        </div>
      </div>

      <Autocomplete />
    </Container>
  )
}