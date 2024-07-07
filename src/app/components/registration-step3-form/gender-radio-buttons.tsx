import { Form, Radio } from "antd";
import { translate } from "../../translation";

interface INameInputProps {
  locale: string;
}

export const GenderRadioButtons = ({ locale }: INameInputProps) => {
  return (
    <div className="form__label">
      <span>{translate("registration.step3.form.gender.label", locale)}</span>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: translate("registration.step3.form.gender.error", locale),
          },
        ]}
      >
        <Radio.Group className="components__radio order__radio-short">
          <Radio value="female">
            {translate("registration.step3.form.gender.female", locale)}
          </Radio>
          <Radio value="male">
            {translate("registration.step3.form.gender.male", locale)}
          </Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};
