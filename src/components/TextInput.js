import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.input`
  padding: 10px;
  border: none;
  box-shadow: 7px 7px 26px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  ${props => props.typeahead && css`
    position: relative;
    width: 20rem;

    .search-results {
      position: absolute;
    }
  `}
`

export const TextInput = ({...props}) => {
  return (
    <Container type="text" {...props} />
  )
}