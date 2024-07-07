import { Form, Input } from "antd";
import { translate } from "../../translation";
import validator from "validator";

interface IEmailInputProps {
  locale: string;
}

type FieldType = {
  email?: string;
};

export const EmailInput = ({ locale }: IEmailInputProps) => {
  return (
    <label className="form__label">
      <span>{translate("registration.step3.form.email.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="email"
        rules={[
          {
            required: true,
            message: translate("registration.step3.form.email.error", locale),
          },
          {
            validator: (_, value) => {
              if (value && !validator.isEmail(value)) {
                return Promise.reject(translate("registration.step3.form.incorrectEmail.error", locale));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          className="form__input"
          placeholder={translate(
            "registration.step3.form.email.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
