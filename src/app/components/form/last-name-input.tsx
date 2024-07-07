import { Form, Input } from "antd";
import { translate } from "../../translation";

interface ILastNameInputProps {
  locale: string;
}

type FieldType = {
  lastName?: string;
};

export const LastNameInput = ({ locale }: ILastNameInputProps) => {
  return (
    <label className="form__label">
      <span>{translate("registration.step3.form.lastName.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="lastName"
        rules={[
          {
            required: true,
            message: translate(
              "registration.step3.form.lastName.error",
              locale
            ),
          },
        ]}
      >
        <Input
          className="form__input"
          placeholder={translate(
            "registration.step3.form.lastName.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
