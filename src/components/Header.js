import React from 'react'
import { Autocomplete } from './Autocomplete'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavList = styled.ul`
  display: flex;
  list-style-type: none;

  li {
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
        <li className="item">Movies</li>
        <li className="item">TV Shows</li>
      </NavList>
      {/* <Autocomplete /> */}
    </Container>
  )
}