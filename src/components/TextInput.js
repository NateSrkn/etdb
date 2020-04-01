import React from 'react'
import styled from 'styled-components'

const Container = styled.input`
  padding: 10px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const TextInput = ({...props}) => {
  return (
    <Container type="text" {...props} />
  )
}