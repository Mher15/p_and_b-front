import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";

interface IPaymentResultProps {
  productsPrice: number;
  deliveryPrice: number;
}

export const PaymentResult = ({
  productsPrice,
  deliveryPrice,
}: IPaymentResultProps) => {
  const locale = useAppSelector((state) => state.profile.locale);
  return (
    <div className="invoice-page__result">
      <h2 className="title title--sm">
        {translate("order.result.title", locale)}
      </h2>
      <dl className="invoice-page__result-list">
        <div>
          <dt>{translate("order.result.price", locale)}:</dt>
          <dd className="invoice-page__price">{productsPrice} ₽ </dd>
        </div>
        <div>
          <dt>{translate("order.delivery.title", locale)}:</dt>
          <dd>{`${
            deliveryPrice || deliveryPrice === 0
              ? deliveryPrice + " ₽"
              : "не расчитана"
          }`}</dd>
        </div>
        <div>
          <dt>{translate("order.result.total", locale)}:</dt>
          <dd className="invoice-page__price">
            {`${productsPrice + deliveryPrice} ₽`}
          </dd>
        </div>
      </dl>
    </div>
  );
};
