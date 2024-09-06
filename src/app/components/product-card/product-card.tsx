import { Link } from "react-router-dom";
import { appRoutes, userRoles } from "../../constants";
import { IProduct } from "../../types";
import { currencyUnitMap } from "../../translation";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addToBasket,
  deleteFromBasket,
  countPlus,
  countMinus,
} from "../../../features/basket/basket-slice";
import { get } from "lodash";
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

  const resultPrice = getPriceWithMarkup(price, userRole);

  const handleIncrement = () => {
    if (basketRow) {
      dispatch(countPlus(basketRow));
    } else {
      dispatch(addToBasket({ product, count: 1 }));
    }
  };

  const handleDecrement = () => {
    if (basketRow && basketRow.count > 1) {
      dispatch(countMinus(basketRow));
    } else if (basketRow && basketRow.count === 1) {
      dispatch(deleteFromBasket(basketRow));
    }
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

          <div className="product__count product-page__count-items">
            <button
              className="components__count-minus"
              onClick={handleDecrement}
              disabled={!basketRow}
            >
              -
            </button>
            <span>{basketRow ? basketRow.count : 0}</span>
            <button
              className="components__count-plus"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
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
