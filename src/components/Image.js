import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 10rem;
  
  ${props => props.xsmall && css`
    width: 3rem;
  `}

  img {
    max-height: 100%;
    max-width: 100%;
  }

  ${props => props.hero && css`
    width: 50%;

    @media screen and (max-width: ${props.theme.breakpoints.mobile}) {
      width: 100%;
    }
  `}

  ${props => props.rounded && css`
    img {
      border-radius: 20px;
      box-shadow: 7px 7px 26px rgba(0, 0, 0, 0.25);
    }
  `}
`

export const Image = ({ children, src, alt, ...props }) => (
    <Container {...props}>
      <img src={src ? `https://image.tmdb.org/t/p/w500/${src}` : `https://via.placeholder.com/500x750.png?text=${alt}`} alt={alt} />
    </Container>
)