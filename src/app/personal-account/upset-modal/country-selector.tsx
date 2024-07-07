import { Form, Select } from "antd";
import { translate } from "../../translation";
import { ICountry } from "../../types";
import { useFetchCountriesQuery } from "../../../features/api/address-api-slice";

interface ICountrySelectorProps {
  locale: string;
}

export const CountrySelector = ({ locale }: ICountrySelectorProps) => {
  const { data: countries = [], isLoading: isCountryLoading } =
    useFetchCountriesQuery();
  const countriesOptions = countries.map((country: ICountry) => ({
    value: country.id,
    label: country.name,
  }));

  return (
    <div className="form__label">
      <span>{translate("registration.step3.form.country.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item
          name="country"
          rules={[
            {
              required: true,
              message: translate(
                "registration.step3.form.country.error",
                locale
              ),
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: "300px", height: "40px" }}
            loading={isCountryLoading}
            options={countriesOptions}
            filterOption={(input, option) =>
              (option?.label.toLocaleLowerCase() ?? "").includes(
                input.toLocaleLowerCase()
              )
            }
            placeholder={translate(
              "registration.step3.form.country.placeholder",
              locale
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
};
