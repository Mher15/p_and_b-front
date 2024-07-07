import { useAppDispatch, useAppSelector } from "../../../hooks";
import { translate } from "../../../translation";
import { useChangePasswordMutation } from "../../../../features/api/auth-api-slice";
import { Loader } from "../../loader";
import { ChangePasswordForm } from "./change-password-form";
import { setUser } from "../../../../features/profile/profile-slice";
import { jwtDecode } from "jwt-decode";
import { IQueryResponse, IChangePasswordResponse, IUser } from "../../../types";
import { Form } from "antd";

interface IChangePasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface IChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const ChangePasswordModal = ({
  isOpen,
  setIsOpen,
}: IChangePasswordModalProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);
  const user = useAppSelector((state) => state.profile.user);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [form] = Form.useForm();

  if (isLoading || !user) return <Loader />;

  const handleClose = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const onFinish = (values: IChangePasswordFormValues) => {
    const { oldPassword, newPassword } = values;
    changePassword({ oldPassword, newPassword, id: user.id }).then(
      (response: IQueryResponse<IChangePasswordResponse>) => {
        const { data, error } = response;
        if (error || !data) {
          throw new Error(`Change password failed: ${error}`);
        }

        const { token } = data;
        localStorage.setItem("token", token);
        const user: IUser = jwtDecode(token);
        dispatch(setUser(user));
        form.resetFields();
        handleClose();
      }
    );
  };

  return (
    <article className={`modal modal--stepped ${isOpen ? "open" : ""}`}>
      <button
        className="btn--reset components__close modal__close"
        onClick={handleClose}
        style={{ zIndex: 100510 }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 1L1 9"></path>
          <path d="M9 9L1 1"></path>
        </svg>
      </button>
      <div
        className={"modal__curtain modal__curtain--login active"}
        data-modal-window="true"
      >
        <div className="modal__content">
          <h2 className="title modal__title">
            {translate("changePassword.title", locale)}
          </h2>
          <p className="modal__descr">
            {translate("changePassword.description", locale)}
          </p>
          <ChangePasswordForm onFinish={onFinish} locale={locale} form={form} />
        </div>
      </div>
    </article>
  );
};
