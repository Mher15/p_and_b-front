import { Checkbox, Form, FormInstance } from "antd";
import { translate } from "../../translation";
import { REGISTRATION_STEP_3_FORM_NAME } from "../../pages/constants";
import {
  IMentorDto,
  IReferralLink,
  IRegistrationStep3FormValues,
} from "../../types";
import { appRoutes } from "../../constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RegistrationStep3FormHeader } from "./registration-step3-form-header";
import { LastNameInput } from "../form/last-name-input";
import { NameInput } from "../form/name-input";
import { DateOfBirthPicker } from "./date-of-birth-picker";
import { PatronymicInput } from "../form/patronymic-input";
import { GenderRadioButtons } from "./gender-radio-buttons";
import { RegionSelector } from "./region-selector";
import { AddressInput } from "./address-input";
import { EmailInput } from "../form/email-input";
import { CheckboxChangeEvent } from "antd/lib/checkbox/Checkbox";
import { PhoneInput } from "../form/phone-input";
import { CitySelector } from "./city-selector";
import { CountrySelector } from "./country-selector";

type FieldType = {
  country?: string;
  sity?: string;
  street?: string;
  houseNumber?: string;
  lastName?: string;
  name?: string;
  patronymic?: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  mentor?: string;
  gender?: string;
  agreement?: boolean;
};

interface IRegistrationStep3FormProps {
  onFinish: (values: IRegistrationStep3FormValues) => void;
  locale: string;
  mentorDto: IMentorDto;
  link: IReferralLink;
  form: FormInstance;
}

const initialValues = {
  country: "",
  street: "",
  houseNumber: "",
  lastName: "",
  name: "",
  patronymic: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  mentor: "",
  gender: "",
  agreement: false,
};

export const RegistrationStep3Form = ({
  onFinish,
  link,
  mentorDto,
  locale,
  form,
}: IRegistrationStep3FormProps) => {
  const agreement = Form.useWatch("agreement", form);
  const [countrySelectorChange,setCountrySelectorChange] = useState(false)

  const onCountrySelectorChange = ()=>{
    setCountrySelectorChange(!countrySelectorChange)
    // to do clear all data from form data
  }

  return (
    <Form
      className="container"
      name={REGISTRATION_STEP_3_FORM_NAME}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <RegistrationStep3FormHeader
        locale={locale}
        mentorDto={mentorDto}
        link={link}
      />
      <div className="partner-reg__form-wrapper">
        <div className="order__block">
          <h2 className="title title--sm order__title">
            {translate("registration.step3.personalData", locale)}
          </h2>
          <div className="order__col">
            <LastNameInput locale={locale} />
            <NameInput locale={locale} />
            <PatronymicInput locale={locale} />
            <DateOfBirthPicker locale={locale} />
            <GenderRadioButtons locale={locale} />
          </div>
        </div>
        <div className="order__block">
          <h2 className="title title--sm order__title">
            {translate("registration.step3.contactDetails", locale)}
          </h2>
          <div className="order__col">
            <CountrySelector locale={locale} onCountrySelectorChange={onCountrySelectorChange} />
            <CitySelector form={form} locale={locale} onCountrySelectorChange={onCountrySelectorChange}  />
            <RegionSelector form={form} locale={locale} onCountrySelectorChange={onCountrySelectorChange} />
          </div>

          <AddressInput locale={locale} />
          <PhoneInput locale={locale} />
          <EmailInput locale={locale} />
        </div>
        <label className="form__checkbox order__checkbox">
          <Form.Item<FieldType> name="agreement" valuePropName="checked">
            <Checkbox>
              {translate("registration.step3.form.agreement", locale)}
            </Checkbox>
          </Form.Item>
        </label>
      </div>
      <div className="partner-reg__controls-bottom">
        <Link to={`${appRoutes.REGISTRATION}/${link.name}/2`}>
          <button className="btn btn--empty btn--lg partner-reg__btn-prev">
            {translate("common.prev", locale)}
          </button>
        </Link>
        <button
          className="btn btn--lg partner-reg__btn-next"
          disabled={!agreement}
          type="submit"
        >
          {translate("common.next", locale)}
        </button>
      </div>
    </Form>
  );
};
