import { Form, Input, InputNumber } from "antd";
import { translate } from "../../translation";

interface IAddressInputProps {
  locale: string;
}

type FieldType = {
  street?: string;
  houseNumber?: number;
};

export const AddressInput = ({ locale }: IAddressInputProps) => {
  return (
    <>
      <label className="form__label">
        <span>{translate("registration.step3.form.street.label", locale)}</span>
        <Form.Item<FieldType> className="form__label" name="street">
          <Input
            className="form__input"
            placeholder={translate(
              "registration.step3.form.street.placeholder",
              locale
            )}
          />
        </Form.Item>
      </label>
      <label className="form__label">
        <span>
          {translate("registration.step3.form.houseNumber.label", locale)}
        </span>
        <Form.Item<FieldType> className="form__label" name="houseNumber">
          <InputNumber
            className="form__input"
            min={1}
            placeholder={translate(
              "registration.step3.form.houseNumber.placeholder",
              locale
            )}
          />
        </Form.Item>
      </label>
    </>
  );
};
