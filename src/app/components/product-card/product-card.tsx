import { Link } from "react-router-dom";
import { appRoutes, userRoles } from "../../constants";
import { BasketRow, IProduct } from "../../types";
import { currencyUnitMap } from "../../translation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToBasket,
  deleteFromBasket,
} from "../../../features/basket/basket-slice";
import { get, isNil } from "lodash";
import { getPriceWithDiscont, getPriceWithMarkup } from "../../../utils";

interface IProductCard {
  product: IProduct;
}
export const ProductCard = ({ product }: IProductCard) => {
  const { id, name, price, discount, description, brand, isAvailable } =
    product;
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const userRole = user?.role || userRoles.GUEST;
  const basketRows = useAppSelector((state) => state.basket.rows);
  const basketRow = basketRows.find((row) => row.product.id === id);
  // const isFavorite = user.favoriteProducts.find(
  //   (productId: number) => productId === product.id
  // );
  const isProductExistToBasket = isNil(basketRow);
  const basketItem = basketRow
    ? basketRow
    : ({ product, count: 0 } as BasketRow);
  const onBasketIconClick = isProductExistToBasket
    ? addToBasket
    : deleteFromBasket;
  const resultPrice = getPriceWithMarkup(price, userRole);
  const handleBasketIconClick = () => {
    dispatch(onBasketIconClick({ ...basketItem }));
  };

  return (
    <article className="product products__item">
      <div className="product__img">
        <picture>
          <source srcSet={`/static/${get(product, "images[0].file")}`} />
          <img
            src={`/static/${get(product, "images[0].file")}`}
            alt={description}
          />
        </picture>
      </div>

      <div className="product__text">
        <h3 className="product__title">
          <Link to={`${appRoutes.PRODUCTS}/${id}`}>{name}</Link>
        </h3>
        <h3 className="product__title">{brand.name}</h3>
        {isAvailable && (
          <p className="product__price">{`${getPriceWithDiscont(
            resultPrice,
            discount
          )} ${currencyUnitMap[locale]}`}</p>
        )}
      </div>
      {isAvailable ? (
        <>
          <button className={`btn--reset togglable product__favorite product`}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.25611 15.2374C-5.22009 7.24783 4.91344 -1.42539 9.25611 4.05901C13.5993 -1.42539 23.7329 7.24783 9.25611 15.2374Z" />
            </svg>
          </button>
          <button
            className={`btn--reset togglable product__card ${
              !isProductExistToBasket ? "active" : ""
            }`}
            onClick={handleBasketIconClick}
          >
            <svg
              width="18"
              height="23"
              viewBox="0 0 18 23"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.30204 12.6622C8.29758 12.6634 7.32377 12.3169 6.54642 11.6817C5.76907 11.0465 5.23626 10.1618 5.03871 9.17843C5.02297 9.07484 5.02997 8.96907 5.05922 8.86845C5.08848 8.76783 5.13929 8.67476 5.20814 8.5957C5.27699 8.51664 5.36223 8.45347 5.45796 8.41056C5.55369 8.36766 5.65762 8.34606 5.76254 8.34724C5.93498 8.34474 6.10264 8.4038 6.23535 8.51378C6.36805 8.62376 6.45706 8.77744 6.48636 8.94714C6.62268 9.59685 6.97876 10.1799 7.49479 10.5984C8.01081 11.0169 8.65535 11.2454 9.32014 11.2454C9.98492 11.2454 10.6295 11.0169 11.1455 10.5984C11.6615 10.1799 12.0176 9.59685 12.1539 8.94714C12.1832 8.77744 12.2722 8.62376 12.4049 8.51378C12.5376 8.4038 12.7053 8.34474 12.8777 8.34724C12.9827 8.34606 13.0866 8.36766 13.1823 8.41056C13.278 8.45347 13.3633 8.51664 13.4321 8.5957C13.501 8.67476 13.5518 8.76783 13.5811 8.86845C13.6103 8.96907 13.6173 9.07484 13.6016 9.17843C13.4028 10.168 12.8647 11.0573 12.0799 11.6932C11.2951 12.3291 10.3127 12.6718 9.30204 12.6622Z" />
              <path d="M15.7441 22.1885H2.86004C2.56551 22.1889 2.27398 22.1294 2.00319 22.0138C1.7324 21.8981 1.48801 21.7286 1.28488 21.5156C1.08175 21.3026 0.924139 21.0506 0.821626 20.7749C0.719112 20.4992 0.673841 20.2056 0.688568 19.9118L1.27487 7.4513C1.29913 6.89267 1.53858 6.365 1.94321 5.97846C2.34784 5.59193 2.88637 5.37643 3.44634 5.37695H15.1578C15.7178 5.37643 16.2563 5.59193 16.661 5.97846C17.0656 6.365 17.305 6.89267 17.3293 7.4513L17.9156 19.9118C17.9303 20.2056 17.8851 20.4992 17.7825 20.7749C17.68 21.0506 17.5224 21.3026 17.3193 21.5156C17.1162 21.7286 16.8718 21.8981 16.601 22.0138C16.3302 22.1294 16.0387 22.1889 15.7441 22.1885ZM3.44634 6.82972C3.25437 6.82972 3.07026 6.90587 2.93452 7.04141C2.79878 7.17696 2.72252 7.3608 2.72252 7.55249L2.13622 19.9841C2.13131 20.082 2.1464 20.1799 2.18057 20.2718C2.21474 20.3637 2.26728 20.4477 2.33499 20.5187C2.4027 20.5897 2.48416 20.6462 2.57442 20.6847C2.66469 20.7233 2.76187 20.7431 2.86004 20.743H15.7441C15.8423 20.7431 15.9395 20.7233 16.0297 20.6847C16.12 20.6462 16.2015 20.5897 16.2692 20.5187C16.3369 20.4477 16.3894 20.3637 16.4236 20.2718C16.4578 20.1799 16.4729 20.082 16.4679 19.9841L15.8817 7.52358C15.8817 7.33189 15.8054 7.14805 15.6696 7.0125C15.5339 6.87696 15.3498 6.80081 15.1578 6.80081L3.44634 6.82972Z" />
              <path d="M13.645 6.10682H12.1974V4.84198C12.1974 4.07522 11.8923 3.33986 11.3493 2.79768C10.8064 2.2555 10.0699 1.95091 9.30206 1.95091C8.53417 1.95091 7.79774 2.2555 7.25477 2.79768C6.7118 3.33986 6.40676 4.07522 6.40676 4.84198V6.10682H4.95911V4.84198C4.95911 3.69184 5.41667 2.58881 6.23113 1.77553C7.04559 0.962262 8.15023 0.505371 9.30206 0.505371C10.4539 0.505371 11.5585 0.962262 12.373 1.77553C13.1874 2.58881 13.645 3.69184 13.645 4.84198V6.10682Z" />
            </svg>
          </button>
        </>
      ) : (
        <p className="product__price">временно недоступен</p>
      )}

      {Boolean(discount) && (
        <span className="product__discount">{discount}%</span>
      )}
    </article>
  );
};
