import React from "react";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 10rem;
  height: auto;

  img {
    max-height: 100%;
    max-width: 100%;
  }

  ${(props) =>
    props.flex &&
    css`
      display: flex;
      align-items: flex-start;
    `}

  ${(props) =>
    props.small &&
    css`
      width: 5rem;
    `}

  ${(props) =>
    props.rounded &&
    css`
      img {
        border-radius: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    `}

  ${(props) =>
    props.hero &&
    css`
      width: 20rem;

      @media screen and (max-width: ${(props) =>
          props.theme.breakpoints.mobile}) {
        width: 100%;
      }
    `}
`;

export const Image = ({ src, alt, type, ...props }) => {
  const determineSrc = () => {
    if (!src) return `https://via.placeholder.com/500x750.png?text=${alt}`;
    switch (type) {
      case "poster":
        return `https://image.tmdb.org/t/p/w220_and_h330_face${src}`;
      case "large_poster":
        return `https://image.tmdb.org/t/p/w440_and_h660_face${src}`;
      case "logo":
        return `https://image.tmdb.org/t/p/h60${src}`;
      default:
        return `https://via.placeholder.com/500x750.png?text=${alt}`;
    }
  };
  return (
    <Container {...props} className="img-container">
      <img src={determineSrc()} alt={alt} />
    </Container>
  );
};

{
  /* <img class="poster lazyload" data-src="https://image.tmdb.org/t/p/w220_and_h330_face/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg" data-srcset="https://image.tmdb.org/t/p/w220_and_h330_face/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg 1x, https://image.tmdb.org/t/p/w440_and_h660_face/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg 2x" alt=""> */
}
