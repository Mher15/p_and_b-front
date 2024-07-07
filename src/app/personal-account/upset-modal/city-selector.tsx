import { Form, Select } from "antd";
import { translate } from "../../translation";
import { useFetchCitiesQuery } from "../../../features/api/address-api-slice";
import { ICity } from "../../types";

interface ICitySelectorProps {
  locale: string;
}

export const CitySelector = ({ locale }: ICitySelectorProps) => {
  const { data: cities = [], isLoading: isCitiesLoading } =
    useFetchCitiesQuery();

  const citiesOptions = cities.map((city: ICity) => ({
    value: city.id,
    label: city.name,
  }));

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
            showSearch
            loading={isCitiesLoading}
            options={citiesOptions}
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
