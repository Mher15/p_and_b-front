import { Link } from "react-router-dom";
import { useFetchCompanyInfoQuery } from "../../../features/api/company-info-api-slice";
import { useAppSelector } from "../../hooks";
import { appRoutes } from "../../constants";

export const ProductBrief = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: companyInfo, isLoading } = useFetchCompanyInfoQuery();
  const companyName = isLoading ? "" : companyInfo?.companyName;

  return (
    <section className="product-brief">
      <div className="container">
        <div className="product-brief__content">
          <h2 className="title product-brief__title">BEST&PEOPLE</h2>
          <p className="product-brief__descr">
            Умные продукты для вашего здоровья
          </p>
          <div className="product-brief__img">
            <picture>
              <source srcSet="/images/product-lg.jpg, /images/product-lg@2x.jpg 2x" />
              <img src="/images/product-lg.jpg" alt="" />
            </picture>
          </div>
          <ul className="components__list product-brief__list">
            <li>международая компания в области сбалансированного питания</li>
            <li>каждый продукт проходит 14 стадий тестирования</li>
            <li>только натуральные составы и безопасные материалы</li>
            <li>способствуем оздоровлению людей по всему миру</li>
          </ul>
          <Link to={appRoutes.ABOUT_US}>
            <button className="btn btn--lg product-brief__btn">
              Подробнее
            </button>
          </Link>
        </div>
        <div className="product-brief__img product-brief__img--dsk">
          <picture>
            <source srcSet="/images/product-lg.jpg, /images/product-lg@2x.jpg 2x" />
            <img src="/images/product-lg.jpg" alt="" />
          </picture>
        </div>
      </div>
    </section>
  );
};
