import { Form, Input } from "antd";
import { translate } from "../../translation";

interface IPatronymicInputProps {
  locale: string;
}

type FieldType = {
  patronymic?: string;
};

export const PatronymicInput = ({ locale }: IPatronymicInputProps) => {
  return (
    <label className="form__label">
      <span>
        {translate("registration.step3.form.patronymic.label", locale)}
      </span>
      <Form.Item<FieldType> className="form__label" name="patronymic">
        <Input
          className="form__input"
          placeholder={translate(
            "registration.step3.form.patronymic.placeholder",
            locale
          )}
        />
      </Form.Item>
    </label>
  );
};
