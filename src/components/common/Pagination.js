import styled from "styled-components";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <Nav className="ul pagination">
      {pagesCount > 0 && (
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            aria-label="Previous"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
      )}
      {pages.map((page) => (
        <li
          className={page === currentPage ? "page-item active" : "page-item"}
          key={page}
        >
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
        </li>
      ))}
      {pagesCount > 0 && (
        <li
          className={
            currentPage >= pages.length ? "page-item disabled" : "page-item"
          }
        >
          <a
            className="page-link"
            aria-label="Next"
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  .page-item {
    cursor: pointer;
  }
`;

export default Pagination;
