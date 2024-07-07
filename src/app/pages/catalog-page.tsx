import { ChangeEvent, useState } from "react";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Loader } from "../components/loader/loader";
import {
  getAllTags,
  getProductsCountByGroup,
  getProductsTranslate,
} from "../../utils";
import { useFetchProductsQuery } from "../../features/api/products-api-slice";
import { flatten, get, uniqBy } from "lodash";
import { CatalogHeader } from "../components/catalog/catalog-header";
import { ProductCard } from "../components/product-card";
import { IProduct, ISearchParams, ITag } from "../types";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { CatalogPagination } from "../components/catalog/catalog-pagination";
import { NewClientModal } from "../components/modals";
import { useAppSelector } from "../hooks";
import { CatalogFilter } from "../components/catalog/catalog-filter/catalog-filter";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./error-page";

const ProductWrapper = styled.div`
  margin: 5px;
`;

export const Catalog = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onNewClientClick = () => {
    setIsNewClientModalOpen(!isNewClientModalOpen);
  };

  const params: ISearchParams = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...params, sort: event.target.value });
  };

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 9;

  const { data: products = [], isLoading } = useFetchProductsQuery();

  if (isLoading) return <Loader />;

  const groups = uniqBy(
    flatten(products.map((product) => product.groups)),
    "id"
  );
  const productsCountByGroup = getProductsCountByGroup(products, groups);

  const prices = products.map((product) => product.price).sort((a, b) => b - a);

  const [maxPrice] = prices;
  const [minPrice] = prices.reverse();
  const tags = getAllTags(products) as ITag[];

  const filterdProducts = products.filter((product: IProduct) => {
    const filterByGroup = params["group"]
      ? product.groups.some((group) => group.name === params["group"])
      : true;
    const filterByMaxPrice = params["maxPrice"]
      ? product.price < Number(params["maxPrice"])
      : true;
    const filterByMinPrice = params["minPrice"]
      ? product.price > Number(params["minPrice"])
      : true;
    const filteredTag = searchParams.get("tag");

    const tags = get(product, "tags");
    const filterByTags = !filteredTag
      ? true
      : tags && tags.some((tag: ITag) => tag.name === filteredTag);

    return (
      filterByGroup && filterByMaxPrice && filterByMinPrice && filterByTags
    );
  });

  type SortFieldType = "name" | "price";
  const sortField = searchParams.get("sort") as SortFieldType;

  const sordedProducts = sortField
    ? filterdProducts.sort((a: IProduct, b: IProduct) => {
        if (a[sortField] < b[sortField]) {
          return -1;
        }
        if (a[sortField] > b[sortField]) {
          return 1;
        }
        return 0;
      })
    : filterdProducts;

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <main className="main catalog">
        <Breadcrumbs />
        <section
          className={`catalog__section ${filterOpen ? "filter-open" : ""}`}
        >
          <div className="container">
            <CatalogHeader
              filterOpen={filterOpen}
              setFilerOpen={setFilterOpen}
            />
            <div className="catalog__wrapper">
              <CatalogFilter
                isFilterOpen={filterOpen}
                productsCountByGroup={productsCountByGroup}
                tags={tags}
                groups={groups}
                maxPrice={maxPrice}
                minPrice={minPrice}
                onNewClientClick={onNewClientClick}
              />
              <div className="catalog__content">
                <div className="catalog__content-info">
                  <div
                    className="components__select catalog__select-wrapper"
                    data-select-placeholder="Сортировка"
                  >
                    <span className="components__select-label">
                      Сортировать
                    </span>
                    <select name="sort" onChange={handleSortChange}>
                      <option value="price">По цене</option>
                      <option value="name">По наименованию</option>
                    </select>
                  </div>
                  <p className="catalog__count">
                    <b>{filterdProducts.length}</b>{" "}
                    {getProductsTranslate(filterdProducts.length, locale)}
                  </p>
                </div>
                <div className="catalog__items-wrapper">
                  <div className="catalog__items">
                    {sordedProducts
                      .slice((page - 1) * pageSize, page * pageSize)
                      .map((product: IProduct) => (
                        <ProductWrapper>
                          <ProductCard key={product.id} product={product} />
                        </ProductWrapper>
                      ))}
                  </div>
                  <CatalogPagination count={filterdProducts.length} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <NewClientModal
          isOpen={isNewClientModalOpen}
          setIsOpen={setIsNewClientModalOpen}
        />
      </main>
    </ErrorBoundary>
  );
};
