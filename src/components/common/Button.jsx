import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  padding: 0.75em 1.75em;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: flex;
    width: 100%;
  }
`;

export const Button = ({ children, link, ...props }) => {
  if (link) {
    return (
      <Link to={link} {...props}>
        <Wrapper>{children}</Wrapper>
      </Link>
    );
  } else {
    return <Wrapper {...props}>{children}</Wrapper>;
  }
};
