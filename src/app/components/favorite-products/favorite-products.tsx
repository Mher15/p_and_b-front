import { Link } from "react-router-dom";
import { appRoutes } from "../../constants";
import { IProduct } from "../../types";
import { translate } from "../../translation";
import { Loader } from "../loader/loader";
import { useFetchFavoriteProductsQuery } from "../../../features/api/products-api-slice";
import { useAppSelector } from "../../hooks";
import { ProductCard } from "../product-card";

export const FavoriteProducts = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: products = [], isLoading: isProductsLoading } =
    useFetchFavoriteProductsQuery();

  if (isProductsLoading) return <Loader />;

  return (
    <section className="products">
      <div className="container">
        <div className="products__header">
          <h2 className="title products__title">
            {translate("favoriteProducts.header.title", locale)}
          </h2>
          <Link
            className="components__link-more products__link"
            to={appRoutes.CATALOG}
          >
            <span>
              {translate("favoriteProducts.header.allProducts", locale)}
            </span>
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
          </Link>
        </div>
        <div className="products__list">
          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
