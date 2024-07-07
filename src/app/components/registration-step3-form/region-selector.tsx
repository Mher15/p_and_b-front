import { Form, Select } from "antd";
import { useEffect,useState} from "react";
import { translate } from "../../translation";
import { useFetchRegionsQuery } from "../../../features/api/address-api-slice";
import { IRegion } from "../../types";

interface IRegionSelectorProps {
  locale: string;
  onCountrySelectorChange:any;
  form:any
}

export const RegionSelector = ({ locale,onCountrySelectorChange ,form}: IRegionSelectorProps) => {
  const { data: regions = [], isLoading: isRegionsLoading } =
    useFetchRegionsQuery();
  const value = form?.getFieldsValue();

  const regionsOptions = regions.map((region: IRegion) => ({
    value: region.id,
    label: region.name,
    countryId:region.countryId
  }));

  const [countryId,setCountryId] = useState('');

  useEffect(() => {
     setCountryId(value?.country)
  }, [onCountrySelectorChange]);

  return (
    <div className="form__label">
      <span>{translate("registration.step3.form.region.label", locale)}</span>
      <div className="components__select form__select">
        <Form.Item name="region">
          <Select
            showSearch
            disabled={!countryId}
            style={{ width: "300px", height: "40px" }}
            loading={isRegionsLoading}
            options={countryId ? regionsOptions?.filter((item) => item.countryId == countryId) : regionsOptions}
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
