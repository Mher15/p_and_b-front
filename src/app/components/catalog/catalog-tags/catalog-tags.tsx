import { useSearchParams } from "react-router-dom";
import { ISearchParams, ITag } from "../../../types";
import { useState } from "react";

interface ICatalogTagsProps {
  tags: ITag[];
  isFilterOpen: boolean;
}

export const CatalogTags = ({ tags, isFilterOpen }: ICatalogTagsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTagFilterOpen, setTagFilterOpen] = useState(isFilterOpen);

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  const handleResetButtonClick = () => {
    setTagFilterOpen(!isTagFilterOpen);
  };

  return (
    <div className={`filter__item ${isTagFilterOpen ? "open" : ""}`}>
      <button
        className="btn--reset title title--sm filter__header"
        onClick={handleResetButtonClick}
      >
        <span>Популярное</span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 7L7 1L1 7"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="filter__inner filter__radio-items filter__radio-items--type2"
        style={!isTagFilterOpen ? { display: "none" } : {}}
      >
        {tags.map(({ name }: ITag, index) => {
          const handleTagClick = () => {
            setSearchParams({ ...params, tag: name });
          };

          return (
            <label
              className="components__radio classic filter__radio-cls"
              key={`${name}_${index}`}
              onClick={handleTagClick}
            >
              <input type="radio" name="pop-cat" value={name} />
              <span>{name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
