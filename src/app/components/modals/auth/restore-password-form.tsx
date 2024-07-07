import { Form, FormInstance } from "antd";
import { RESTORE_PASSWORD_FORM_NAME } from "./constants";
import { translate } from "../../../translation";
import { MaskedInput } from "antd-mask-input";

type FieldType = {
  phone?: string;
};

interface IRestorePasswordFormValues {
  phone: string;
}

interface IRestorePasswordFormProps {
  onFinish: (values: IRestorePasswordFormValues) => void;
  locale: string;
  form: FormInstance;
}

const initialValues = {
  phone: "",
};

export const RestorePasswordForm = ({
  onFinish,
  locale,
  form,
}: IRestorePasswordFormProps) => {
  return (
    <Form
      className="modal__form"
      name={RESTORE_PASSWORD_FORM_NAME}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType>
        className="form__label modal__label"
        name="phone"
        rules={[
          {
            required: true,
            message: translate("authentification.phone.error", locale),
          },
        ]}
      >
        <MaskedInput
          className="form__input"
          type="tel"
          mask="+0 (000) 000-00-00"
          placeholder={translate("authentification.phone.placeholder", locale)}
        />
      </Form.Item>

      <Form.Item>
        <div className="modal__controls">
          <button className="btn btn--lg modal__restore-pass" type="submit">
            Восстановить пароль
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};
