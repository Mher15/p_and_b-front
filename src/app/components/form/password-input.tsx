import { useField } from "formik";
import { RequiredFieldError } from "./form-validation-error";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface IPasswordInputInputOwnProps {
  id?: string;
  name: string;
  placeholder: string;
}

export const PasswordInput = (props: IPasswordInputInputOwnProps) => (
  <Input.Password
    className="form__input"
    iconRender={(visible) =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
    }
    {...props}
  />
);

interface AuthInputOwnProps {
  placeholder: string;
  id: string;
  name: string;
}

export const AuthPasswordInput = (props: AuthInputOwnProps) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input className="form-input" type="password" {...field} {...props} />
      {meta.touched && meta.error ? <RequiredFieldError /> : null}
    </>
  );
};
