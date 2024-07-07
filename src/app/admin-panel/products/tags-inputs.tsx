import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

export const TagsInputs = () => {
  return (
    <Form.List name="tags">
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field) => (
            <Space key={field.key}>
              <Form.Item
                {...field}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Введите тэг или удалите это поле.",
                  },
                ]}
                noStyle
              >
                <Input style={{ width: "60%" }} />
              </Form.Item>
              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => remove(field.name)}
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
              Добавить тэг
            </Button>

            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
