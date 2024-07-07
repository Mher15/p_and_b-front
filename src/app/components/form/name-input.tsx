import { Form, Input } from "antd";
import { translate } from "../../translation";

interface INameInputProps {
  locale: string;
}

type FieldType = {
  name?: string;
};

export const NameInput = ({ locale }: INameInputProps) => {
  return (
    <label className="form__label">
      <span>{translate("registration.step3.form.name.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="name"
        rules={[
          {
            required: true,
            message: translate("registration.step3.form.name.error", locale),
          },
        ]}
      >
        <Input
          className="form__input"
          placeholder={translate(
            "registration.step3.form.name.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
