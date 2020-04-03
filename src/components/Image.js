import React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  width: 10rem;
  height: auto;

  img {
    max-height: 100%;
    max-width: 100%;
  }

  ${props => props.flex && css`
    display: flex;
    align-items: flex-start;
  `}

  ${props => props.small && css`
    width: 5rem;
  `}

  ${props => props.rounded && css`
    img {
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  `}

  ${props => props.hero && css`
    width: 20rem;

    @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
      width: 100%;
    }
  `}
`

export const Image = ({ children, src, alt, ...props }) => (
    <Container {...props} className="img-container">
      <img src={src ? `https://image.tmdb.org/t/p/w500/${src}` : `https://via.placeholder.com/500x750.png?text=${alt}`} alt={alt} />
    </Container>
)