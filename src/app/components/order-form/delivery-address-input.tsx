import { Form, Input } from "antd";
import { translate } from "../../translation";
import { useAppSelector } from "../../hooks";

type FieldType = {
  deliveryAddress?: string;
};

export const DeliveryAddressInput = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  return (
    <label className="form__label">
      <span>{translate("order.form.deliveryAddress.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="deliveryAddress"
        rules={[
          {
            required: true,
            message: translate("order.form.deliveryAddress.error", locale),
          },
          {
            validator: (_, value) => {
              const addressRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,-]+ \d+$/;
              if (value && !addressRegex.test(value)) {
                return Promise.reject(
                  translate(
                    "order.form.deliveryAddress.incorrectAddresError",
                    locale
                  )
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          className="form__input"
          placeholder={translate(
            "order.form.deliveryAddress.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
