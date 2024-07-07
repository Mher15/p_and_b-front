import { Form, Select } from "antd";
import { translate } from "../../translation";
import { useFetchCitiesQuery } from "../../../features/api/address-api-slice";
import { ICity } from "../../types";
import { useState,useEffect } from "react";

interface ICitySelectorProps {
  locale: string;
  onCountrySelectorChange:any;
  onCitySelectorCanges:any;
  form:any
}

export const CitySelector = ({ locale,onCountrySelectorChange,onCitySelectorCanges,form }: ICitySelectorProps) => {
  const { data: cities = [], isLoading: isCitiesLoading } =
    useFetchCitiesQuery();
  const value = form?.getFieldsValue();
  const citiesOptions = cities.map((city: ICity) => ({
    value: city.id,
    label: city.name,
    countryId:city.countryId
  }));

  const [countryId,setCountryId] = useState('');

  useEffect(() => {
    setCountryId(value?.country)
  }, [onCountrySelectorChange]);

  return (
    <div className="form__label">
      <span>{translate("registration.step3.form.city.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item
          name="city"
          rules={[
            {
              required: true,
              message: translate("registration.step3.form.city.error", locale),
            },
          ]}
        >
          <Select
            style={{ width: "300px", height: "40px" }}
            onChange={onCitySelectorCanges}
            showSearch
            disabled={!countryId}
            loading={isCitiesLoading}
            options={countryId ? citiesOptions?.filter((item) => item.countryId == countryId) : citiesOptions}
            filterOption={(input, option) =>
              (option?.label.toLocaleLowerCase() ?? "").includes(
                input.toLocaleLowerCase()
              )
            }
            placeholder={translate(
              "registration.step3.form.city.placeholder",
              locale
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
};
