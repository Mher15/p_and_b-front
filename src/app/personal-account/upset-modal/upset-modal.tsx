import { IProfile, IUserData } from "../../types";
import { UserUpsertForm } from "./upset-form";
import { Form } from "antd";
import { useUpdateUserMutation } from "../../../features/api/user-api-slice";
import { translate } from "../../translation";
import { useAppSelector } from "../../hooks";

interface IProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  profile: IProfile;
  userId: number;
}

export const UserUpsetModal = ({
  isOpen,
  setIsOpen,
  profile,
  userId,
}: IProps) => {
  const [updateUser] = useUpdateUserMutation();
  const locale = useAppSelector((state) => state.profile.locale);

  const [form] = Form.useForm();

  form.setFieldsValue({
    ...profile,
    country: profile.country.id,
    city: profile.city.id,
    region: profile.region?.id,
  });

  const handleClose = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleSubmit = (formValues: IUserData) => {
    updateUser({ id: userId, editedUser: formValues });
    handleClose();
  };

  return (
    <article className={`modal ${isOpen ? "open" : ""}`}>
      <button
        className="btn--reset components__close modal__close"
        onClick={handleClose}
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
          <h2 className="title title--sm order__title">
            {translate("registration.step3.contactDetails", locale)}
          </h2>
          <UserUpsertForm
            form={form}
            onSubmit={handleSubmit}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </article>
  );
};
