import { Form, FormInstance } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  totalPriceWithoutDiliverySelector,
  totalWeightSelector,
} from "../../selectors/order";
import { usePricingCalculationQuery } from "../../../features/api/delivery-api-slice";
import { deliveryMethods } from "../../constants";
import { setDeliveryPrice } from "../../../features/order/order-slice";
import { PaymentResult } from "../payment-result";

interface IOrderFormResultProps {
  form: FormInstance;
}

export const OrderResult = ({ form }: IOrderFormResultProps) => {
  const dispatch = useAppDispatch();
  const orderDeliveryPrice = useAppSelector(
    (state) => state.order.deliveryPrice
  );
  const totalWeight = useAppSelector(totalWeightSelector);
  const priceWithoutDilivery = useAppSelector(
    totalPriceWithoutDiliverySelector
  );

  const countryId = Form.useWatch("deliveryCountry", form);
  const cityId = Form.useWatch("deliveryCity", form);
  const deliveryMethod = Form.useWatch("deliveryMethod", form);
  const deliveryAddress = Form.useWatch("deliveryAddress", form);
  const destinationStationId = Form.useWatch("destinationStationId", form);
  const offer = Form.useWatch("offer", form);
  const params = {
    countryId,
    cityId,
    deliveryAddress,
    deliveryMethod,
    totalWeight,
    destinationStationId,
    offer,
  };
  const isNotMethodForCalculation =
    !deliveryMethod || deliveryMethod === deliveryMethods.YOU_SELF;

  const isPickupDataNotReady =
    deliveryMethod === deliveryMethods.PICKUP && !destinationStationId;

  const isAddressDataNotReady = !countryId && cityId && deliveryAddress;
  const isCourierDataNotReady =
    isAddressDataNotReady ||
    (deliveryMethod === deliveryMethods.COURIER && !offer);

  const skip =
    !totalWeight ||
    isNotMethodForCalculation ||
    isPickupDataNotReady ||
    isCourierDataNotReady;

  const { data: deliveryPrice = 0 } = usePricingCalculationQuery(params, {
    skip,
  });

  if (deliveryPrice && deliveryPrice !== orderDeliveryPrice) {
    dispatch(setDeliveryPrice(deliveryPrice));
  }

  return (
    <PaymentResult
      productsPrice={priceWithoutDilivery}
      deliveryPrice={deliveryPrice}
    />
  );
};
