import { isEmpty } from "lodash";
import {
  useFetchCompanyInfoQuery,
  useUpdateCompanyInfoMutation,
  useAddCompanyInfoMutation,
} from "../../../features/api/company-info-api-slice";
import { Loader } from "../../components/loader/loader";
import { ICompanyInfo } from "../../types";
import { Button, Form, Input, InputNumber, Space } from "antd";
import styled from "styled-components";
import { ContentLayout } from "../../components/layouts";
import { PhoneInput } from "./phone-input";
import { useAppSelector } from "../../hooks";
import { translate } from "../../translation";

const Title = styled.span`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const CompanyInfo = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data: companyInfo, isLoading } = useFetchCompanyInfoQuery();
  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const [createCompanyInfo] = useAddCompanyInfoMutation();

  const onSubmit = isEmpty(companyInfo) ? createCompanyInfo : updateCompanyInfo;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  if (companyInfo) {
    form.setFieldsValue(companyInfo);
  }

  const onFinish = (formValues: ICompanyInfo) => {
    onSubmit(formValues);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <ContentLayout>
      <Title> Информация о компании</Title>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="companyName"
          label="Название компании"
          rules={[{ required: true }]}
        >
          <Input className="form__input" />
        </Form.Item>
        <PhoneInput locale={locale} />
        <Form.Item name="telegram" label="Telegram">
          <Input className="form__input" />
        </Form.Item>
        <Form.Item name="email" label="email">
          <Input className="form__input" />
        </Form.Item>
        <Form.Item name="inn" label={translate("companyInfo.inn", locale)}>
          <Input className="form__input" />
        </Form.Item>
        <Form.Item
          name="address"
          label={translate("companyInfo.address", locale)}
        >
          <Input className="form__input" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </ContentLayout>
  );
};
