import React from "react";

const PaginationComp = ({ totalPost, postsPerPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <span className="page-link" onClick={() => paginate(number)}>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComp;
