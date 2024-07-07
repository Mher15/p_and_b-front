import { floor } from "lodash";
import { useSearchParams } from "react-router-dom";
import { ISearchParams } from "../../../types";
import { useState } from "react";

interface ICatalogPaginationProps {
  count: number;
}

export const CatalogPagination = ({ count }: ICatalogPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setSetPage] = useState(1);
  const pageSise = 9;
  const pagesCount = floor(count / pageSise) + 1;

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const handlePrevClick = () => {
    if (page > 1) {
      setSetPage(page - 1);
      setSearchParams({ ...params, page: String(page - 1) });
    }
  };

  const handleNextClick = () => {
    if (page < pagesCount) {
      setSetPage(page + 1);
      setSearchParams({ ...params, page: String(page + 1) });
    }
  };

  return (
    <div className="breadcrumbs catalog__breadcrumbs">
      <button
        className={`btn--reset breadcrumbs__item breadcrumbs__item--prev ${
          page === 1 ? "inactive" : ""
        }`}
        onClick={handlePrevClick}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.0835 1.16658L6.91683 6.99992L1.0835 12.8333"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className="breadcrumbs__list">
        {Array.from({ length: pagesCount }, (_, index) => {
          const pageNumber = index + 1;
          const handlePageClick = () => {
            setSetPage(pageNumber);
            setSearchParams({ ...params, page: String(pageNumber) });
          };
          return (
            <li
              key={pageNumber}
              className={`breadcrumbs__item ${
                page === index + 1 ? "active" : ""
              }`}
            >
              <button
                key={pageNumber}
                className="btn--reset"
                onClick={handlePageClick}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={`btn--reset breadcrumbs__item breadcrumbs__item--next ${
          page === pagesCount ? "inactive" : ""
        }`}
        onClick={handleNextClick}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.0835 1.16658L6.91683 6.99992L1.0835 12.8333" />
        </svg>
      </button>
    </div>
  );
};
