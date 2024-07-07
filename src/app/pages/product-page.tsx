import { useParams } from "react-router-dom";
import { useFetchProductQuery } from "../../features/api/products-api-slice";
import { Breadcrumbs } from "../components/breadcrumbs";
import { Services } from "../components/services";
import { useAppSelector } from "../hooks";
import { Loader } from "../components/loader/loader";
import { ProductSwiper } from "../components/product/product-images-swiper";
import { PartnerProgram } from "../components/product/partner-programm";
import { ProductInfo } from "../components/product/product-info";
import { ProductTags } from "../components/product/product-tags";
import { ProductTabsContent } from "../components/product/product-tabs-content";
import { userRoles } from "../constants";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./error-page";

export const Product = () => {
  const user = useAppSelector((state) => state.profile.user);
  const role = user?.role || userRoles.GUEST;
  const { productId } = useParams();
  const id = productId ? Number(productId) : 0;
  const { data: product } = useFetchProductQuery(id);

  if (!product) return <Loader />;

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <main className="main product-page">
        <Breadcrumbs product={product} />
        <section className="product-page__section" data-tabs-page="true">
          <div className="container">
            <div className="product-page__main">
              <ProductSwiper images={product.images} />
              <div className="product-page__info">
                <ProductInfo product={product} userRole={role} />
                <ProductTags product={product} />
              </div>
            </div>
            <ProductTabsContent product={product} />
          </div>
        </section>
        <Services />
        <PartnerProgram />
      </main>
    </ErrorBoundary>
  );
};
