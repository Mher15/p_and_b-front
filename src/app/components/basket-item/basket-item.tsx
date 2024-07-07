import { useAppDispatch, useAppSelector } from "../../hooks";
import { BasketRow } from "../../types";
import {
  deleteFromBasket,
  countPlus,
  countMinus,
} from "../../../features/basket/basket-slice";
import { userRoles } from "../../constants";
import { getPriceWithMarkup } from "../../../utils";
import { get } from "lodash";

interface IProps {
  basketRow: BasketRow;
}

export const BasketItem = ({ basketRow }: IProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);
  const userRole = user?.role || userRoles.GUEST;
  const price = get(basketRow, "product.price");
  const resultPrice = getPriceWithMarkup(price, userRole);

  const minus = () => {
    dispatch(countMinus(basketRow));
  };
  const plus = () => {
    dispatch(countPlus(basketRow));
  };

  const handleDelete = () => {
    dispatch(deleteFromBasket(basketRow));
  };

  return (
    <tr className="invoice-page__item">
      <td className="invoice-page__product">
        <picture>
          <source srcSet={`/static/${basketRow.product.images[0]}`} />
          <img src={`/static/${basketRow.product.images[0]}`} alt="" />
        </picture>
        <h2>{basketRow.product.name}</h2>
      </td>
      <td className="invoice-page__price">{resultPrice} ₽ </td>
      <td className="invoice-page__count">
        <div className="components__count invoice-page__count-inner">
          <button className="components__count-minus" onClick={minus}></button>
          <span>{basketRow.count}</span>
          <button className="components__count-plus" onClick={plus}></button>
        </div>
      </td>
      <td className="invoice-page__price">
        {(resultPrice * (basketRow.count || 0)).toFixed(2)} ₽{" "}
      </td>
      <td className="invoice-page__close-wrapper">
        <button
          className="btn--reset components__close invoice-page__close"
          onClick={handleDelete}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 1L1 9" />
            <path d="M9 9L1 1" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
