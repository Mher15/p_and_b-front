import { useSearchParams } from "react-router-dom";
import { ISearchParams } from "../../../types";

interface ICetalogFilterProps {
  filterOpen: boolean;
  setFilerOpen: (filterOpen: boolean) => void;
}

export const CatalogHeader = ({
  filterOpen,
  setFilerOpen,
}: ICetalogFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const onfilterButtonClick = () => {
    setFilerOpen(!filterOpen);
    if (filterOpen) {
      setSearchParams({});
    }
  };

  const handleClose = () => {
    setFilerOpen(false);
  };

  return (
    <div className="catalog__header">
      <h1 className="title">Каталог товаров</h1>
      <button className="btn catalog__filter-btn" onClick={onfilterButtonClick}>
        <span>Фильтр</span>
        <span>Сбросить</span>
        <svg
          width="22"
          height="19"
          viewBox="0 0 22 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.8384 5H8.83838" />
          <path d="M12.8384 14H3.83838" />
          <circle cx="4.83838" cy="5" r="4" />
          <circle cx="16.8384" cy="14" r="4" />
        </svg>
      </button>
      <button
        className="btn--reset components__close catalog__filter-close"
        onClick={handleClose}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L1 9" />
          <path d="M9 9L1 1" />
        </svg>
      </button>
    </div>
  );
};
