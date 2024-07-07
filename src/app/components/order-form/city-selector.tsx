import { Form, Select } from "antd";
import { translate } from "../../translation";
import { useFetchCitiesQuery } from "../../../features/api/address-api-slice";
import { ICity } from "../../types";
import { useAppSelector } from "../../hooks";

export const CitySelector = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: cities = [], isLoading: isCitiesLoading } =
    useFetchCitiesQuery();

  const citiesOptions = cities.map((city: ICity) => ({
    value: city.id,
    label: city.name,
  }));

  return (
    <div className="form__label">
      <span>{translate("order.form.deliveryCity.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item
          name="deliveryCity"
          rules={[
            {
              required: true,
              message: translate("order.form.deliveryCity.error", locale),
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
              "order.form.deliveryCity.placeholder",
              locale
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
};
