import { useSearchParams } from "react-router-dom";
import { IGroup, ISearchParams } from "../../../types";

type ProductsCountByGroupType = {
  [key: string]: number;
};

interface ICatalogRadioGroupsProps {
  groups: IGroup[];
  productsCountByGroup: ProductsCountByGroupType;
  isFilterOpen: boolean;
}

export const CatalogRadioGroups = ({
  groups,
  productsCountByGroup,
  isFilterOpen,
}: ICatalogRadioGroupsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return (
    <div className={`filter__item ${isFilterOpen ? "open" : ""}`}>
      <button className="btn--reset title title--sm filter__header">
        <span>Все категории</span>
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
        className="filter__inner filter__radio-items"
        style={!isFilterOpen ? { display: "none" } : {}}
      >
        {groups.map((group) => {
          const handleRadioClick = () => {
            setSearchParams({ ...params, group: group.name });
          };
          return (
            <label
              className="components__radio filter__radio"
              onClick={handleRadioClick}
              key={group.id}
            >
              <input
                type="radio"
                name="category"
                value={group.name}
                checked={params.group === group.name}
              />
              <span>
                {group.name}{" "}
                <small> ({productsCountByGroup[group.id] || 0})</small>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
