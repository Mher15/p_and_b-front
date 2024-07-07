import { IProfile } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Form } from "antd";
import { PageLayout } from "../../components/layouts";
import { translate } from "../../translation";
import { setIsProductModalOpen } from "../../../features/modals/product-modal-slice";
import styled from "styled-components";
import { AvatarUploader } from "./avatar-uploader";
import type { GetRef } from "antd";
import { CountrySelector } from "./country-selector";
import { RegionSelector } from "./region-selector";
import { CitySelector } from "./city-selector";
import { AddressInput } from "./address-input";
import { PhoneInput } from "../../components/form/phone-input";
import { EmailInput } from "../../components/form/email-input";

const StyledLabel = styled.span`
  white-space: break-spaces;
`;

type FormInstance = GetRef<typeof Form>;

interface IUserUpsertFormProps {
  onSubmit: (values: IProfile) => void;
  form: FormInstance;
  setIsOpen: (isOpen: boolean) => void;
}

export const UserUpsertForm = ({ onSubmit, form }: IUserUpsertFormProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.locale);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (formValues: IProfile) => {
    onSubmit(formValues);
    dispatch(setIsProductModalOpen({ isOpen: false }));
    form.resetFields();
  };

  const setAvatar = (avatarFileName: string) => {
    form.setFieldValue("avatar", avatarFileName);
  };

  const avatar = Form.useWatch("avatar", form);

  return (
    <PageLayout>
      <Form
        {...layout}
        form={form}
        name="upset-user"
        onFinish={onFinish}
        style={{ maxWidth: 600, zIndex: 10113 }}
      >
        <div className="order__block">
          <div className="order__col">
            <CountrySelector locale={locale} />
            <CitySelector locale={locale} />
            <RegionSelector locale={locale} />
          </div>

          <AddressInput locale={locale} />
          <PhoneInput locale={locale} />
          <EmailInput locale={locale} />
        </div>

        <Form.Item
          name="avatar"
          label={
            <StyledLabel>
              {translate("user.form.avatar.label", locale)}
            </StyledLabel>
          }
        >
          <AvatarUploader
            selectedAvatar={avatar}
            setSelectedAvatar={setAvatar}
          />
        </Form.Item>

        <div className="form-fotter">
          <button className="btn btn--lg" type="submit">
            {translate("common.save", locale)}
          </button>
        </div>
      </Form>
    </PageLayout>
  );
};
