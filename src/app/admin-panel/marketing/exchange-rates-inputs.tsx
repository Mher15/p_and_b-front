import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Space } from "antd";
import { CountrySelector } from "./country-selector";

export const ExchangeRatesInputs = () => {
  return (
    <Form.List name="exchangeRates">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <>
              <CountrySelector fieldName={name} />
              <Form.Item
                {...restField}
                validateTrigger={["onChange", "onBlur"]}
                name={[name, "rate"]}
                label="квк"
              >
                <InputNumber />
              </Form.Item>

              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => remove(name)}
              />
            </>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Добавить запись
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
