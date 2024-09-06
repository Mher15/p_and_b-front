import { Link } from "react-router-dom";
import { appRoutes } from "../../../constants";
// import { ICatalogProduct } from "../../../types";
import { useState } from "react";
import { addToBasket } from "../../../../features/basket/basket-slice";
import { useAppDispatch } from "../../../hooks";

interface IProductPageControlsProps {
  product: any;
}

export const ProductPageControls = ({ product }: IProductPageControlsProps) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);

  const countMinus = () => {
    if (count <= 1){
      return
    }else{
      setCount(count - 1);
    } 
  };
  const countPlus = () => {
    setCount(count + 1);
  };
  const onBuyClick = () => {
    dispatch(addToBasket({ product, count }));
  };

  if (!product.isAvailable) {
    return <div className="product-page__price">временно недоступен</div>;
  }

  return (
    <div className="product-page__controls">
      <div className="components__count product-page__count-items">
        <button
          className="components__count-minus"
          onClick={countMinus}
        ></button>
        <span>{count}</span>
        <button className="components__count-plus" onClick={countPlus}></button>
      </div>
      <Link to={appRoutes.BASKET}>
        <button className="btn btn--lg product-page__buy" onClick={onBuyClick}>
          <span>КУПИТЬ</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.66667 7.33333H3.16667L1.5 16.5H16.5L14.8333 7.33333H12.3333M5.66667 7.33333V4.83333C5.66667 2.99239 7.15905 1.5 9 1.5V1.5C10.8409 1.5 12.3333 2.99238 12.3333 4.83333V7.33333M5.66667 7.33333H12.3333M5.66667 7.33333V9.83333M12.3333 7.33333V9.83333"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>

      <button
        className={`btn--reset togglable product__favorite product-page__fav`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.25611 15.2374C-5.22009 7.24783 4.91344 -1.42539 9.25611 4.05901C13.5993 -1.42539 23.7329 7.24783 9.25611 15.2374Z" />
        </svg>
      </button>
    </div>
  );
};
