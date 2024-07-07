import { isEmpty } from "lodash";
import { Button, Divider, Flex, Form, InputNumber, Space } from "antd";
import styled from "styled-components";
import { MarketingUploader } from "./marketing-uploader";
import {
  useAddMarketingMutation,
  useFetchMarketingQuery,
  useLazyCalculateQuery,
  useUpdateMarketingMutation,
} from "../../../features/api/marketing-api-slice";
import { ContentLayout } from "../../components/layouts";
import { Loader } from "../../components/loader";
import { IMarketing } from "../../types";
import { GiftLevelsInputs } from "./gift-levels-inputs";
import { AmbassadorLevelsInputs } from "./ambassador-inputs";
import { GroupTurnoverLevelsInputs } from "./group-turnover-inputs";
import { DateOfRewardsPicker } from "./date-of-rewards-picker";
import { ExchangeRatesInputs } from "./exchange-rates-inputs";
import dayjs from "dayjs";

const Title = styled.span`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const Marketing = () => {
  const [form] = Form.useForm();

  const setFile = (fileName: string) => {
    form.setFieldValue("file", fileName);
  };

  const { data: marketing = {}, isLoading } = useFetchMarketingQuery();
  const [createMarketing] = useAddMarketingMutation();
  const [updateMarketing] = useUpdateMarketingMutation();
  const [calculate] = useLazyCalculateQuery();

  const onSubmit = isEmpty(marketing) ? createMarketing : updateMarketing;

  const handleCalculateRewards = () => {
    calculate();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  if (marketing) {
    form.setFieldsValue({
      ...marketing,
      dateOfRewards: marketing?.dateOfRewards
        ? dayjs(marketing.dateOfRewards)
        : "",
    });
  }

  const file = Form.useWatch("file", form);

  const onFinish = (formValues: IMarketing) => {
    onSubmit(formValues);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <ContentLayout>
      <Form {...layout} form={form} name="marketing" onFinish={onFinish}>
        <Form.Item
          name="file"
          label="Файл маркетинга"
          rules={[
            {
              required: true,
              message: 'Поле "Файл маркетинга" обязательно для заполнения',
            },
          ]}
        >
          <MarketingUploader
            setSelectedMarketingFile={setFile}
            selectedMarketingFile={file}
          />
        </Form.Item>
        <DateOfRewardsPicker />
        <Form.Item name="exchangeRates" label="курсы валют">
          <ExchangeRatesInputs />
        </Form.Item>
        <Divider />
        <Flex gap="middle" vertical>
          <Title>Вознаграждение за личный оборот</Title>
          <Form.Item name="giftLevels" label="Уровни вознаграждения">
            <GiftLevelsInputs />
          </Form.Item>
        </Flex>

        <Divider />
        <Flex gap="middle" vertical>
          <Title>Кэшбек</Title>
          <Form.Item name="rewardsMoreThen" label="Все, что выше">
            <InputNumber />
          </Form.Item>
          <Form.Item name="rewardsLevel" label="Начиная с">
            <InputNumber />
          </Form.Item>
          <Form.Item name="rewardsPercent" label="%">
            <InputNumber />
          </Form.Item>
        </Flex>
        <Divider />
        <Flex gap="middle" vertical>
          <Title>Бонус наставника</Title>
          <Form.Item name="mentorBonusLevel" label="до">
            <InputNumber />
          </Form.Item>
          <Form.Item name="mentorBonusPercent" label="%">
            <InputNumber />
          </Form.Item>
        </Flex>
        <Divider />
        <Flex gap="middle" vertical>
          <Title>Амбассадор</Title>
          <AmbassadorLevelsInputs />
        </Flex>
        <Divider />
        <Flex gap="middle" vertical>
          <Title>Групповой товарооборот</Title>
          <GroupTurnoverLevelsInputs />
        </Flex>
        <Divider />
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleCalculateRewards}>
        Посчитать вознаграждения
      </Button>
    </ContentLayout>
  );
};
