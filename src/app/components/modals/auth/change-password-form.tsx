import { translate } from "../../../translation";
import { Form, Input } from "antd";
import { CHANGE_PASSWORD_FORM_NAME } from "./constants";
import { FormInstance } from "antd/lib";

interface IChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

type FieldType = {
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
};

interface IChangePasswordProps {
  onFinish: (values: IChangePasswordFormValues) => void;
  locale: string;
  form: FormInstance;
}

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
};

export const ChangePasswordForm = ({
  onFinish,
  locale,
  form,
}: IChangePasswordProps) => {
  return (
    <Form
      className="modal__form"
      name={CHANGE_PASSWORD_FORM_NAME}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<FieldType>
        className="form__label modal__label"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: translate("changePassword.oldPassword.error", locale),
          },
        ]}
      >
        <Input.Password
          className="form__input"
          placeholder={translate("changePassword.oldPassword", locale)}
        />
      </Form.Item>

      <Form.Item<FieldType>
        className="form__label modal__label"
        name="newPassword"
        rules={[
          {
            required: true,
            message: translate("changePassword.newPassword.error", locale),
          },
        ]}
      >
        <Input.Password
          className="form__input"
          placeholder={translate("changePassword.newPassword", locale)}
        />
      </Form.Item>

      <Form.Item<FieldType>
        className="form__label modal__label"
        name="newPasswordConfirm"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: translate(
              "changePassword.newPasswordConfirm.error",
              locale
            ),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  translate(
                    "changePassword.newPasswordConfirm.notConfirmError",
                    locale
                  )
                )
              );
            },
          }),
        ]}
      >
        <Input.Password
          className="form__input"
          placeholder={translate("changePassword.newPasswordConfirm", locale)}
        />
      </Form.Item>

      <Form.Item>
        <div className="modal__controls">
          <button className="btn btn--lg modal__change-password" type="submit">
            {translate("changePassword.buttonText", locale)}
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};
