import { Form, Select } from "antd";
import { translate } from "../../translation";
import { ICountry } from "../../types";
import { useFetchCountriesQuery } from "../../../features/api/address-api-slice";
import { useAppSelector } from "../../hooks";


export const CountrySelector = () => {  
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: countries = [], isLoading: isCountryLoading } =
    useFetchCountriesQuery();

  const countriesOptions = countries.map((country: ICountry) => ({
    value: country.id,
    label: country.name,
  }));

  return (
    <div className="form__label">
      <span>{translate("order.form.deliveryCountry.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item
          name="deliveryCountry"
          rules={[
            {
              required: true,
              message: translate("order.form.deliveryCountry.error", locale),
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: "300px", height: "40px" }}
            loading={isCountryLoading}
            options={countriesOptions}
            filterOption={(input, option) => {
              return (option?.label.toLocaleLowerCase() ?? "").includes(
                input.toLocaleLowerCase()
              );
            }}
            placeholder={translate(
              "order.form.deliveryCountry.placeholder",
              locale
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
};
