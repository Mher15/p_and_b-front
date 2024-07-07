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
    <Form.Item<FieldType>
      name="phone"
      label={translate("companyInfo.phone", locale)}
    >
      <MaskedInput
        className="form__input"
        type="tel"
        mask="+0 (000) 000-00-00"
        placeholder={translate("companyInfo.phone.placeholder", locale)}
      />
    </Form.Item>
  );
};
