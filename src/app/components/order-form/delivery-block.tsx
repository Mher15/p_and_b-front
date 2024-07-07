import { Form, FormInstance, Radio } from "antd";
import { deliveryMethods } from "../../constants";
import { translate } from "../../translation";
import { CitySelector } from "./city-selector";
import { CountrySelector } from "./country-selector";
import { DeliveryAddressInput } from "./delivery-address-input";
import { PickupPointsList } from "./pickup-points-list";
import { OffersList } from "./offers-list";
import { useAppSelector } from "../../hooks";

interface IOrderFormProps {
  form: FormInstance;
}

export const DeliveryBlock = ({ form }: IOrderFormProps) => {
  const locale = useAppSelector((state) => state.profile.locale);
  const deliveryMethod = Form.useWatch("deliveryMethod", form);
  const countryId = Form.useWatch("deliveryCountry", form);
  const cityId = Form.useWatch("deliveryCity", form);
  const deliveryAddress = Form.useWatch("deliveryAddress", form);
  const isAddressDataReady = countryId && cityId && deliveryAddress;

  return (
    <div className="order__block">
      <h2 className="title title--sm order__title">
        {translate("order.form.title", locale)}
      </h2>
      <div className="order__col order__col--2">
        <CountrySelector />

        <div className="form__label">
          <CitySelector />
        </div>
      </div>
      <div className="order__col">
        <DeliveryAddressInput />
      </div>
      <div className="order__col">
        <h2 className="title title--sm order__title">
          {translate("order.deliveryMethods", locale)}
        </h2>
        <div className="order__radios">
          <Form.Item
            name="deliveryMethod"
            rules={[
              {
                required: true,
                message: translate("order.deliveryMethod.error", locale),
              },
            ]}
          >
            <Radio.Group className="order__radios" value="youSelf">
              <Radio value="youSelf">
                {translate("order.deliveryMethods.youSelf", locale)}
              </Radio>
              <Radio value="pickup">
                {translate("order.deliveryMethods.pickup", locale)}
              </Radio>
              <Radio value="courier">
                {translate("order.deliveryMethods.courier", locale)}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        {isAddressDataReady && deliveryMethod === deliveryMethods.PICKUP && (
          <PickupPointsList form={form} />
        )}
        {isAddressDataReady && deliveryMethod === deliveryMethods.COURIER && (
          <OffersList form={form} />
        )}
      </div>
    </div>
  );
};
