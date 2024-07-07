import styled from "styled-components";
import { CatalogPriceSelector } from "../catalog-price-selector";
import { CatalogRadioGroups } from "../catalog-radio-gpoups";
import { CatalogTags } from "../catalog-tags";
import { IGroup, ITag } from "../../../types";

const NewClientLink = styled.div`
  cursor: pointer;
`;

type ProductsCountByGroupType = {
  [key: string]: number;
};

interface ICatalogFilterProps {
  isFilterOpen: boolean;
  productsCountByGroup: ProductsCountByGroupType;
  groups: IGroup[];
  tags: ITag[];
  maxPrice: number;
  minPrice: number;
  onNewClientClick: () => void;
}

export const CatalogFilter = ({
  isFilterOpen,
  productsCountByGroup,
  tags,
  groups,
  maxPrice,
  minPrice,
  onNewClientClick,
}: ICatalogFilterProps) => {
  return (
    <aside
      className="filter catalog__filter"
      style={isFilterOpen ? { maxHeight: 700 } : {}}
    >
      <h2 className="sr-only">Заголовок фильтра</h2>
      <div className="filter__wrapper">
        <CatalogRadioGroups
          productsCountByGroup={productsCountByGroup}
          groups={groups}
          isFilterOpen={isFilterOpen}
        />
        <CatalogPriceSelector
          max={maxPrice}
          min={minPrice}
          isFilterOpen={isFilterOpen}
        />
        <CatalogTags tags={[...tags]} isFilterOpen={isFilterOpen} />
        <article className="catalog-banner filter__banner">
          <div className="catalog-banner__inner">
            <h3 className="catalog-banner__title">
              <b>-30%</b>
              навсегда
            </h3>
            <NewClientLink
              className="components__link-more catalog-banner__link"
              onClick={onNewClientClick}
            >
              <span>Стать клиентом</span>
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 7.00049H1" />
                <path d="M9.9502 0.975586L16.0002 6.99959L9.9502 13.0246" />
              </svg>
            </NewClientLink>
          </div>
          <picture className="catalog-banner__img">
            <source srcSet="/images/banner.jpg, /images/banner@2x.jpg 2x" />
            <img src="/images/banner.jpg" alt="" />
          </picture>
        </article>
      </div>
    </aside>
  );
};
