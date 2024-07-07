import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Space } from "antd";

export const AmbassadorLevelsInputs = () => {
  return (
    <Form.List name="ambassadorLevels">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                validateTrigger={["onChange", "onBlur"]}
                name={[name, "partnerCount"]}
                label="Количество партнёров"
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                {...restField}
                validateTrigger={["onChange", "onBlur"]}
                name={[name, "reward"]}
                label="УЕ"
              >
                <InputNumber />
              </Form.Item>

              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => remove(name)}
              />
            </Space>
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
