import { Form } from "antd";
import { translate } from "../../translation";
import { MaskedInput } from "antd-mask-input";

interface IPhoneInputProps {
  locale: string;
}

type FieldType = {
  phone?: string;
};

export const PhoneInput = ({ locale }: IPhoneInputProps) => {
  return (
    <label className="form__label">
      <span>{translate("registration.step3.form.phone.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="phone"
        rules={[
          {
            required: true,
            message: translate("registration.step3.form.phone.error", locale),
          },
        ]}
      >
        <MaskedInput
          className="form__input"
          type="tel"
          mask="+0 (000) 000-00-00"
          placeholder={translate(
            "registration.step3.form.phone.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
