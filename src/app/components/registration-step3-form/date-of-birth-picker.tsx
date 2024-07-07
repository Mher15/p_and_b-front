import { DatePicker, Form } from "antd";
import { translate } from "../../translation";

interface IDateOfBirthPickerProps {
  locale: string;
}

type FieldType = {
  dateOfBirth?: string;
};

export const DateOfBirthPicker = ({ locale }: IDateOfBirthPickerProps) => {
  return (
    <label className="form__label">
      <span>
        {translate("registration.step3.form.dateOfBirth.label", locale)}
      </span>
      <Form.Item<FieldType>
        className="form__label"
        name="dateOfBirth"
        rules={[
          {
            required: true,
            message: translate(
              "registration.step3.form.dateOfBirth.error",
              locale
            ),
          },
        ]}
      >
        <DatePicker
          className="form__input"
          placeholder={translate(
            "registration.step3.form.dateOfBirth.placeholder",
            locale
          )}
          format={"DD-MM-YYYY"}
        />
      </Form.Item>
    </label>
  );
};
