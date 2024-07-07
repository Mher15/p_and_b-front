import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Space } from "antd";

export const GiftLevelsInputs = () => {
  return (
    <Form.List name="giftLevels">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            return (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  validateTrigger={["onChange", "onBlur"]}
                  name={[name, "level"]}
                  label="PV"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  {...restField}
                  validateTrigger={["onChange", "onBlur"]}
                  name={[name, "percent"]}
                  label="%"
                >
                  <InputNumber />
                </Form.Item>

                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(name)}
                />
              </Space>
            );
          })}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Добавить уровень
            </Button>
          </Form.Item>
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
  );
};
