import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space } from "antd";

export const GroupTurnoverLevelsInputs = () => {
  return (
    <Form.List name="groupTurnoverLevels">
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
                name={[name, "qualification"]}
                label="Квалификация"
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...restField}
                validateTrigger={["onChange", "onBlur"]}
                name={[name, "volume"]}
                label="Объеём"
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
