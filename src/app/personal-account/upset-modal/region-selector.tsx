import { Form, Select } from "antd";
import { translate } from "../../translation";
import { useFetchRegionsQuery } from "../../../features/api/address-api-slice";
import { IRegion } from "../../types";

interface IRegionSelectorProps {
  locale: string;
}

export const RegionSelector = ({ locale }: IRegionSelectorProps) => {
  const { data: regions = [], isLoading: isRegionsLoading } =
    useFetchRegionsQuery();

  const regionsOptions = regions.map((region: IRegion) => ({
    value: region.id,
    label: region.name,
  }));

  return (
    <div className="form__label">
      <span>{translate("registration.step3.form.region.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item name="region">
          <Select
            showSearch
            style={{ width: "300px", height: "40px" }}
            loading={isRegionsLoading}
            options={regionsOptions}
            filterOption={(input, option) =>
              (option?.label.toLocaleLowerCase() ?? "").includes(
                input.toLocaleLowerCase()
              )
            }
            placeholder={translate(
              "registration.step3.form.region.placeholder",
              locale
            )}
          />
        </Form.Item>
      </div>
    </div>
  );
};
