import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export const Pagination = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(totalItems / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav className="root">
      <section className="section">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </section>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
