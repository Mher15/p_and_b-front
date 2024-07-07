import "../scss/style.scss";
import { Advantages } from "../components/advantages";
import { FavoriteProducts } from "../components/favorite-products/favorite-products";
import { ProductBrief } from "../components/product-brief";
import { ProductGroups } from "../components/product-groups";
import { Services } from "../components/services";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./error-page";

export const MainPage = () => (
  <ErrorBoundary fallback={<ErrorPage />}>
    <main className="main">
      <ProductGroups />
      <FavoriteProducts />
      <Advantages />
      <Services />
      <ProductBrief />
    </main>
  </ErrorBoundary>
);
