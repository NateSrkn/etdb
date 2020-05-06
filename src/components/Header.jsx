import React from "react";
import { Logo } from "./common/Logo";
import { Autocomplete } from "./Autocomplete";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div id="nav-header" className="nav-header">
      <div className="nav-header-content">
        <div className="sub-content">
          <Link to="/" className="logo">
            <Logo style={{ width: "5rem" }} />
          </Link>
          <ul className="nav-items">
            <li className="item">
              <NavLink to="/all/movies">Movies</NavLink>
            </li>
            <li className="item">
              <NavLink to="/all/shows">TV Shows</NavLink>
            </li>
          </ul>
        </div>
        <div className="search">
          <Autocomplete />
        </div>
      </div>
    </div>
  );
};
