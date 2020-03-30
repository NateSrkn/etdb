import styled, { css } from 'styled-components'

export const Root = styled.div`

`

export const GradientBackground = styled.div`
  background-image: linear-gradient(to right, rgba(20.78%, 24.31%, 30.98%, 1.00) 150px, rgba(29.80%, 31.76%, 36.08%, 0.84) 100%)
`

export const Section = styled.section`
  max-width: 78rem;
  margin: 0 auto;
  padding: 1.5rem 0;

  ${props => props.hero && css`
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
      ${'' /* flex-direction: column; */}
    }
  `}

  @media screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 15px;
  }
`