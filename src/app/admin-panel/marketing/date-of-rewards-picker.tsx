import { DatePicker, Form } from "antd";
import { translate } from "../../translation";
import { useAppSelector } from "../../hooks";

type FieldType = {
  dateOfRewards?: string;
};

export const DateOfRewardsPicker = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  return (
    <label className="form__label">
      <span>{translate("marketing.dateOfRewards.label", locale)}</span>
      <Form.Item<FieldType>
        className="form__label"
        name="dateOfRewards"
        rules={[
          {
            required: true,
            message: translate("marketing.dateOfRewards.error", locale),
          },
        ]}
      >
        <DatePicker className="form__input" format={"DD.MM.YYYY"} />
      </Form.Item>
    </label>
  );
};
