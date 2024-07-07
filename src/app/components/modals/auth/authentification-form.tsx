import { Form, FormInstance, Input } from "antd";
import { AUTHENTIFICATION_FORM_NAME } from "./constants";
import { translate } from "../../../translation";
import { MaskedInput } from "antd-mask-input";

type FieldType = {
  phone?: string;
  password?: string;
};

interface IAuthentificationFormValues {
  phone: string;
  password: string;
}

interface IAuthentificationFormProps {
  onFinish: (values: IAuthentificationFormValues) => void;
  handleForgetPassword: () => void;
  locale: string;
  form: FormInstance;
}

const initialValues = {
  phone: "",
  password: "",
};

export const AuthentificationForm = ({
  onFinish,
  locale,
  handleForgetPassword,
  form,
}: IAuthentificationFormProps) => {
  return (
    <Form
      className="modal__form"
      name={AUTHENTIFICATION_FORM_NAME}
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

      <Form.Item<FieldType>
        className="form__label modal__label"
        name="password"
        rules={[
          {
            required: true,
            message: translate("authentification.password.error", locale),
          },
        ]}
      >
        <Input.Password
          className="form__input"
          placeholder={translate(
            "authentification.password.placeholder",
            locale
          )}
        />
      </Form.Item>

      <Form.Item>
        <div className="modal__controls">
          <button className="btn btn--lg modal__login-to" type="submit">
            Войти
          </button>

          <button
            className="btn btn--lg modal__forget-trigger"
            type="button"
            data-change-step="2"
            onClick={handleForgetPassword}
          >
            Забыли пароль?
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};
