import { Form, Select } from "antd";
import { translate } from "../../translation";
import { ICountry } from "../../types";
import { useFetchCountriesQuery } from "../../../features/api/address-api-slice";
import { useAppSelector } from "../../hooks";

interface ICountrySelectorProps {
  fieldName: number;
}

export const CountrySelector = ({ fieldName }: ICountrySelectorProps) => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: countries = [], isLoading: isCountryLoading } =
    useFetchCountriesQuery();
  const countriesOptions = countries.map((country: ICountry) => ({
    value: country.id,
    label: country.name,
  }));

  return (
    <div className="form__label">
      <div className="components__select form__select">
        <Form.Item
          name={[fieldName, "country"]}
          label={translate("registration.step3.form.country.label", locale)}
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
