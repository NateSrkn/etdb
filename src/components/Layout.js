import styled, { css } from 'styled-components'

export const Root = styled.div`

`

export const Section = styled.section`
  max-width: 78rem;
  margin: 0 auto;
  padding: 1.5rem 0;

  ${props => props.hero && css`
    display: flex;

    @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
      flex-direction: column;
    }
  `}

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 15px;
  }
`